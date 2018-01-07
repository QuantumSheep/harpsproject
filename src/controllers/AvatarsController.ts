"use strict";

import { Request, Response } from "express";
import * as glob from 'glob';
import * as fs from 'fs';
import * as path from 'path';
import * as formidable from 'formidable';
import { FileUploader, MB } from "../services/FileUploader";

export class AvatarsController {
    public static findAvatar(req: Request, res: Response) {
        glob(path.resolve(`avatars/${req.params.iduser}.*`), (err, matches) => {
            res.setHeader('Content-Type', 'image/jpeg');
            res.sendFile(matches.length > 0 ? matches[0] : path.resolve(`avatars/default.jpg`));
        });
    }

    public static updateProfilPic(req: Request, res: Response) {
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.multiples = true;
        form.parse(req);

        form.on('error', err => {
            res.end('error');
        });

        form.on('file', (name, file) => {
            let extension = new RegExp(/^.*\.(.*)$/i).exec(file.name);
            let acceptedType = [
                "jpg",
                "jpeg",
                "png"
            ];

            if (extension && extension[1] && acceptedType.indexOf(extension[1]) > -1) {
                let fileupload = new FileUploader(`${path.resolve('avatars')}/`, 20 * MB);
                
                fileupload.image(`${res.locals.account.idusers}.${extension[1]}`, file)
                    .then(value => {
                        glob(path.resolve(`avatars/${res.locals.account.idusers}.*`), (err, matches) => {
                            matches.forEach((match) => {
                                if (extension && path.resolve(match) != path.resolve(`avatars/${res.locals.account.idusers}.${extension[1]}`)) {
                                    fs.unlink(match, err => { });
                                }
                            });
                        });

                        res.setHeader("Content-Type", "text/plain");
                        res.end('done');
                    })
                    .catch(err => {
                        res.setHeader("Content-Type", "text/plain");
                        res.end(err);
                    });
            } else {
                res.end("INVALIDFILETYPE");
            }
        });
    }
}