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

