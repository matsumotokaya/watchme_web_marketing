/**
 * WatchMe ユーザー認証システム - Supabase Auth
 * 新規会員登録・ログイン・パスワードリセット機能
 */

// Supabase クライアント初期化
let supabase = null;

// 設定読み込み（本番環境では.envから自動読み込み）
const SUPABASE_CONFIG = {
    url: 'https://qvtlwotzuzbavrzqhyvt.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2dGx3b3R6dXpiYXZyenFoeXZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzODAzMzAsImV4cCI6MjA2Njk1NjMzMH0.g5rqrbxHPw1dKlaGqJ8miIl9gCXyamPajinGCauEI3k'
};

// Supabase初期化
function initializeSupabase() {
    try {
        if (typeof window.supabase === 'undefined') {
            console.error('Supabase ライブラリが読み込まれていません');
            showAlert('システム初期化に失敗しました', 'error');
            return;
        }
        
        supabase = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
        console.log('Supabase初期化完了');
    } catch (error) {
        console.error('Supabase初期化エラー:', error);
        showAlert('システム初期化に失敗しました', 'error');
    }
}

// DOM読み込み完了時に初期化
document.addEventListener('DOMContentLoaded', function() {
    initializeSupabase();
    setupAuthEventListeners();
});

// =============================================================================
// イベントリスナー設定
// =============================================================================

function setupAuthEventListeners() {
    // 新規会員登録フォーム
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    // ログインフォーム
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // パスワードリセットフォーム
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', handleForgotPassword);
    }

    // ソーシャル認証ボタン
    const googleSignupBtn = document.getElementById('google-signup');
    if (googleSignupBtn) {
        googleSignupBtn.addEventListener('click', () => handleSocialAuth('google', 'signup'));
    }

    const googleLoginBtn = document.getElementById('google-login');
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', () => handleSocialAuth('google', 'login'));
    }
}

// =============================================================================
// 新規会員登録処理
// =============================================================================

async function handleSignup(event) {
    event.preventDefault();
    
    const submitBtn = document.getElementById('signup-btn');
    const form = event.target;
    
    try {
        // ローディング状態に変更
        setButtonLoading(submitBtn, true);
        
        // フォームデータ取得
        const formData = new FormData(form);
        const displayName = formData.get('displayName');
        let email = formData.get('email');
        const password = formData.get('password');
        const passwordConfirm = formData.get('passwordConfirm');
        const termsAccepted = formData.get('terms');
        const newsletter = formData.get('newsletter');

        // 開発環境用：メールアドレスにタイムスタンプを追加（テスト用）
        if (email.includes('@test.') || email.includes('@dev.')) {
            const timestamp = Date.now();
            const [localPart, domain] = email.split('@');
            email = `${localPart}+${timestamp}@${domain}`;
            console.log('テスト用メールアドレス:', email);
        }

        // バリデーション
        if (!validateSignupForm(displayName, email, password, passwordConfirm, termsAccepted)) {
            return;
        }

        // Supabase認証実行
        console.log('認証開始:', { email, displayName });
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    display_name: displayName,
                    newsletter_subscription: !!newsletter
                }
            }
        });

        console.log('認証結果:', { data, error });

        if (error) {
            console.error('認証エラー詳細:', error);
            throw error;
        }

        if (!data.user) {
            console.error('ユーザーデータが空です:', data);
            throw new Error('ユーザー作成に失敗しました');
        }

        // 認証成功を確認
        console.log('Authentication成功 - ユーザーID:', data.user.id);
        
        // プロファイル情報をusersテーブルに保存（認証成功後）
        try {
            await createUserProfile(data.user, displayName, newsletter);
            console.log('ユーザープロファイル作成成功');
        } catch (profileError) {
            console.error('ユーザープロファイル作成エラー:', profileError);
            // プロファイル作成は失敗したが、認証は成功している
            showAlert('認証は成功しましたが、プロファイル情報の保存に失敗しました。', 'error');
        }

        // 成功時の処理
        console.log('新規会員登録完了:', data);
        showSuccessModal();
        
    } catch (error) {
        console.error('新規会員登録エラー:', error);
        showAlert(getErrorMessage(error), 'error');
    } finally {
        setButtonLoading(submitBtn, false);
    }
}

function validateSignupForm(displayName, email, password, passwordConfirm, termsAccepted) {
    // 表示名チェック
    if (!displayName || displayName.trim().length < 2) {
        showAlert('表示名は2文字以上で入力してください', 'error');
        return false;
    }

    // メールアドレスチェック
    if (!email || !isValidEmail(email)) {
        showAlert('正しいメールアドレスを入力してください', 'error');
        return false;
    }

    // パスワードチェック
    if (!password || password.length < 8) {
        showAlert('パスワードは8文字以上で入力してください', 'error');
        return false;
    }

    // パスワード確認チェック
    if (password !== passwordConfirm) {
        showAlert('パスワードが一致しません', 'error');
        return false;
    }

    // 利用規約同意チェック
    if (!termsAccepted) {
        showAlert('利用規約とプライバシーポリシーに同意してください', 'error');
        return false;
    }

    return true;
}

// =============================================================================
// ログイン処理
// =============================================================================

async function handleLogin(event) {
    event.preventDefault();
    
    const submitBtn = document.getElementById('login-btn');
    const form = event.target;
    
    try {
        // ローディング状態に変更
        setButtonLoading(submitBtn, true);
        
        // フォームデータ取得
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');
        const remember = formData.get('remember');

        // バリデーション
        if (!validateLoginForm(email, password)) {
            return;
        }

        // Supabase認証実行
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            throw error;
        }

        // ログイン状態保持設定
        if (remember) {
            localStorage.setItem('watchme_remember_login', 'true');
        }

        // 成功時の処理
        console.log('ログイン成功:', data);
        showAlert('ログインしました', 'success');
        
        // ダッシュボードへリダイレクト（実装時に変更）
        setTimeout(() => {
            window.location.href = '/dashboard'; // 実際のダッシュボードURLに変更
        }, 1500);
        
    } catch (error) {
        console.error('ログインエラー:', error);
        showAlert(getErrorMessage(error), 'error');
    } finally {
        setButtonLoading(submitBtn, false);
    }
}

function validateLoginForm(email, password) {
    if (!email || !isValidEmail(email)) {
        showAlert('正しいメールアドレスを入力してください', 'error');
        return false;
    }

    if (!password) {
        showAlert('パスワードを入力してください', 'error');
        return false;
    }

    return true;
}

// =============================================================================
// パスワードリセット処理
// =============================================================================

async function handleForgotPassword(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const email = formData.get('resetEmail');

    if (!email || !isValidEmail(email)) {
        showAlert('正しいメールアドレスを入力してください', 'error');
        return;
    }

    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`
        });

        if (error) {
            throw error;
        }

        showAlert('パスワードリセット用のメールを送信しました', 'success');
        closeForgotPassword();
        
    } catch (error) {
        console.error('パスワードリセットエラー:', error);
        showAlert(getErrorMessage(error), 'error');
    }
}

// =============================================================================
// ユーザープロファイル作成処理
// =============================================================================

async function createUserProfile(user, displayName, newsletter) {
    try {
        // 少し待ってからプロファイル作成（認証完了を待つ）
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // public.usersテーブルにプロファイル情報を保存
        const { data, error } = await supabase
            .from('users')
            .insert([
                {
                    user_id: user.id,  // auth.usersのidと連携
                    name: displayName,
                    email: user.email,
                    newsletter_subscription: !!newsletter,
                    created_at: new Date().toISOString()
                }
            ])
            .select();

        if (error) {
            console.error('プロファイル作成エラー詳細:', error);
            throw error;
        }

        console.log('ユーザープロファイル作成完了:', data);
        return data;
        
    } catch (error) {
        console.error('ユーザープロファイル作成失敗:', error);
        console.error('エラー詳細:', error.message);
        console.error('エラーコード:', error.code);
        throw error;
    }
}

// =============================================================================
// ソーシャル認証処理
// =============================================================================

async function handleSocialAuth(provider, type) {
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: provider,
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        });

        if (error) {
            throw error;
        }

        console.log(`${provider}認証開始:`, data);
        
    } catch (error) {
        console.error(`${provider}認証エラー:`, error);
        showAlert(getErrorMessage(error), 'error');
    }
}

// =============================================================================
// UI操作関数
// =============================================================================

function setButtonLoading(button, isLoading) {
    const btnText = button.querySelector('.btn-text');
    const btnLoading = button.querySelector('.btn-loading');
    
    if (isLoading) {
        button.disabled = true;
        btnText.classList.add('hidden');
        btnLoading.classList.remove('hidden');
    } else {
        button.disabled = false;
        btnText.classList.remove('hidden');
        btnLoading.classList.add('hidden');
    }
}

function showSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function showForgotPassword() {
    const modal = document.getElementById('forgot-password-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closeForgotPassword() {
    const modal = document.getElementById('forgot-password-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function redirectToLogin() {
    window.location.href = 'login.html';
}

function showAlert(message, type = 'info') {
    const alertId = type === 'error' ? 'error-alert' : 'success-alert';
    const alert = document.getElementById(alertId);
    
    if (alert) {
        const alertText = alert.querySelector('.alert-text');
        alertText.textContent = message;
        alert.classList.remove('hidden');
        
        // 5秒後に自動で閉じる
        setTimeout(() => {
            alert.classList.add('hidden');
        }, 5000);
    }
}

function closeAlert() {
    const successAlert = document.getElementById('success-alert');
    const errorAlert = document.getElementById('error-alert');
    
    if (successAlert) successAlert.classList.add('hidden');
    if (errorAlert) errorAlert.classList.add('hidden');
}

// =============================================================================
// ユーティリティ関数
// =============================================================================

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function getErrorMessage(error) {
    // Supabaseエラーメッセージの日本語化
    const errorMessages = {
        'Invalid login credentials': 'メールアドレスまたはパスワードが正しくありません',
        'User already registered': 'このメールアドレスは既に登録されています',
        'Password should be at least 6 characters': 'パスワードは6文字以上で入力してください',
        'Email not confirmed': 'メールアドレスの確認が完了していません',
        'Invalid email': 'メールアドレスの形式が正しくありません',
        'Too many requests': 'リクエストが多すぎます。しばらく時間をおいてから再度お試しください'
    };

    return errorMessages[error.message] || error.message || 'エラーが発生しました';
}