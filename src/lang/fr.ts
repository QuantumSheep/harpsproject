'use strict'

import { Lang } from '../interfaces/LangInterface';

let lang: Lang = {
    name: "fr",
    title: "Harps - Gestionnaire d'Entreprise",
    menu: {
        home: "Accueil",
        documentation: "Documentation",
        plans: "Formules",
        signin: "Se connecter à mon compte"
    },
    input: {
        email: "Adresse mail",
        password: "Mot de passe",
        firstname: "Prénom",
        lastname: "Nom de famille",
        birthdate: "Date de naissance"
    },
    page: {
        not_found: {
            title: "Page non trouvée",
            error: "Page non trouvée"
        },
        forbidden: {
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
            picture: "Image de profil",
            profil: "Profil",
            admin: "Compte",
            change_pass: "Modification du mot de passe",
            last_pass: "Ancien mot de passe",
            first_new_pass: "Nouveau mot de passe",
            secondary_new_pass: "Réentrez votre nouveau mot de passe",
            change_name: "Modification du nom et du prénom",
            change_mail: "Modification de l'adresse Mail",
            change_birth: "Modification de la date de naissance",
            job_done: "Modification effectuées",
            send: "Confirmer",
            ask_password: "Veuillez rentrer votre mot de passe",
            
            error_shortpass: "Votre mot de passe doit contenir au minimum 8 charactères",
        }
    }
}

export = lang;