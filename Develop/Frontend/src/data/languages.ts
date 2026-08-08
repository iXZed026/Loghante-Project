interface ILanguage {
    id: number;
    code: string;
    name: string;
}

export const languages:
    ILanguage[] = [
        { id: 1, code: "en", name: "English" },
        { id: 2, code: "fa", name: "Persian" }
    ];