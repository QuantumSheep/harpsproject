"use strict";

import { Lang } from '../interfaces/LangInterface';
import config from '../config';

let lang: Lang = {
    name: "fr",
    title: "Harps - Gestionnaire d'Entreprise",
    menu: {
        home: "Accueil",
        documentation: "Documentation",
        plans: "Formules",
        signin: "Se connecter à mon compte"
    },
    sidebar: {
        account: {
            title: "Mon compte"
        },
        group: {
            title: "Mes groupes"
        }
    },
    input: {
        email: "Adresse mail",
        password: "Mot de passe",
        firstname: "Prénom",
        lastname: "Nom de famille",
        birthdate: "Date de naissance"
    },
    button: {
        confirm: "Confirmer"
    },
    views: {
        err404: {
            title: "Page non trouvée",
            error: "Page non trouvée"
        },
        err403: {
            title: "Accès refusé",
            error: "Accès refusé"
        },
        index: {
            title: "Accueil"
        },
        login: {
            title: "Connexion",
            header: "Se connecter à votre compte",
            login: "Se connecter",
            joinus: "Vous voulez créer un groupe?",
            signup: "Créer un compte",
            error_credentials: "Mauvais identifiants, vérifiez vos informations"
        },
        register: {
            title: "Inscription",
            header: "Créer un nouveau compte",
            register: "Créer le compte",
            alreadyregistred: "Déjà inscrits?",
            login: "Se connecter",
            error_email: "Cet email est déjà utilisée",
            error_notvalid: "Les informations que vous avez saisies sont invalides"
        },
        plans: {
            title: "Formules",
            header: "Choisissez votre formule"
        },
        account: {
            all: {
                job_done: "Changements effectués",
            },
            companies: {
                title: "Mes boîtes",
            },
            emails: {
                title: "Mes emails",
            },
            groups: {
                title: "Mes groupes",
            },
            security: {
                title: "Sécurité du compte",
                changePass: "Changement de mot de passe",
                oldPass: "Ancien mot de passe",
                newPass: "Nouveau mot de passe",
                newPass2: "Retapez le nouveau mot de passe",
                wrongPassword: "Mauvais ancien mot de passe.",
                tooShortPassword: "Le nouveau mot de passe est trop court, 8 caractères minimum requis."
            },
            settings: {
                title: "Paramètres du compte",
                basics: "Informations de base",
                picture: "Image de profil",
                maxPPWeight: `L'image ne doit pas faire plus de ${config.file.maxWeight} Mo.`
            }
        }
    }
}

export = lang;