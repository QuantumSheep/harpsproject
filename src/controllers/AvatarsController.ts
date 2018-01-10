"use strict";

import { Request, Response } from "express";
import * as glob from 'glob';
import * as fs from 'fs';
import * as path from 'path';
import * as formidable from 'formidable';
import { FileUploader, MB } from "../services/FileUploader";
import config from '../config';

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
            let acceptedType = {
                "image/jpeg": "jpg",
                "image/png": "png"
            };

            if (acceptedType[file.type]) {
                let fileupload = new FileUploader(`${path.resolve(config.directories.avatars)}/`, 1 * MB);

                res.setHeader("Content-Type", "text/plain");

                fileupload.image(`${res.locals.account.idusers}.${acceptedType[file.type]}`, file)
                    .then(value => {
                        glob(path.resolve(`avatars/${res.locals.account.idusers}.*`), (err, matches) => {
                            matches.forEach((match) => {
                                if (acceptedType[file.type] && path.resolve(match) != path.resolve(`${config.directories.avatars}${res.locals.account.idusers}.${acceptedType[file.type]}`)) {
                                    fs.unlink(match, err => { });
                                }
                            });
                        });

                        res.end('done');
                    })
                    .catch(err => {
                        res.end(err);
                    });
            }
        });
    }
}