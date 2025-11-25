function UpgradeBanner() {
    return (
        <div className="w-full px-4 py-2 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 max-w-7xl mx-auto">
            <p className="font-medium">
                Upgrade to Premium for more features!{' '}
                <a href="/upgrade" className="underline font-bold">
                    Upgrade Now
                </a>
            </p>
        </div>
    );
}
export default UpgradeBanner;