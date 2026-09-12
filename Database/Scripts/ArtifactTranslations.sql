CREATE TABLE ArtifactTranslations (
    ArtifactId INTEGER NOT NULL,
    LanguagesId INTEGER NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,

    CONSTRAINT PK_ArtifactTranslations
        PRIMARY KEY (ArtifactId, LanguagesId),

    CONSTRAINT FK_ArtifactTranslations_Artifact
        FOREIGN KEY (ArtifactId)
        REFERENCES Artifacts(ArtifactId)
        ON DELETE CASCADE,

    CONSTRAINT FK_ArtifactTranslations_Language
        FOREIGN KEY (LanguagesId)
        REFERENCES Languages(LanguagesId)
        ON DELETE CASCADE
);

INSERT INTO ArtifactTranslations
    (ArtifactId, LanguagesId, Name, Description)
VALUES
    (1, 1, 'اثر تاریخی اول', 'توضیحات فارسی اثر'),
    (1, 2, 'Historical Artifact One', 'Artifact description in English'),
    (1, 3, 'Objet historique un', 'Description en français');