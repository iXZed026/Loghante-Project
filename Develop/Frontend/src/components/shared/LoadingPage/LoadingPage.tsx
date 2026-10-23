interface ILoadingPageComponenet {
    background? : string
}

export default function LoadingPageComponenet({
    background="bg-crimson",
}: ILoadingPageComponenet) {
    return (
        <main
            className={`fixed inset-0 z-50 flex min-h-screen w-full items-center justify-center ${background}`}
            role="status"
            aria-label="Loading page"
        >
            <span
                role="img"
                aria-label="Loghanteh logo"
                className="block h-16 w-16 bg-[var(--gold-color)] md:h-20 md:w-20"
                style={{
                    maskImage: 'url("/images/Loghanteh-logo.svg")',
                    WebkitMaskImage: 'url("/images/Loghanteh-logo.svg")',
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                    maskPosition: "center",
                    WebkitMaskPosition: "center",
                    maskSize: "contain",
                    WebkitMaskSize: "contain",
                }}
            />
        </main>
    );
}