"use strict";

import * as fs from 'fs';
import * as Jimp from 'jimp';
import { WriteStream } from 'fs';

export const KB = 1024;
export const MB = KB * 1024;
export const GB = MB * 1024;
export const TB = GB * 1024;

export class FileUploader {
    toDirectory: string
    maxBytes: number

    constructor(toDirectory: string, maxBytes: number) {
        this.toDirectory = toDirectory;
        this.maxBytes = maxBytes;
    };

    public file(name, file, callback?: (err: string | null, wstream: WriteStream | null) => any) {
        if (this.maxBytes >= file.size) {
            let rstream = fs.createReadStream(file.path);
            let wstream = fs.createWriteStream(this.toDirectory + file.name);

            rstream.pipe(wstream);

            if (callback) callback(null, wstream);
        } else {
            if (callback) callback("FILETOOHEAVY", null);
        }
    }

    public image(name, file): Promise<string> {
        let toDirectory = this.toDirectory;

        return new Promise<string>((resolve, reject) => {
            if (this.maxBytes >= file.size) {
                Jimp.read(file.path, (err, image) => {
                    if (err) reject(err);
                    image.cover(128, 128).write(`${toDirectory}${name}`, (err, image) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve("done");
                        }
                    });
                });
            } else {
                reject("FILETOOHEAVY");
            }
        });
    }
}