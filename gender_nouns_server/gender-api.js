"use strict";
const _ = require("lodash");
const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const app = express();
const url = require("url");

class GenderAPI {
  constructor() {
    // instance variables
  }

  createWhere(query) {
    // console.log(query['en-starts-with']);
    // console.log(query.q);
    // console.log(query.exact);
    // console.log(query.ar);
    // console.log(query.fr);
    // console.log(query.de);
    // console.log(query.hi);
    // console.log(query.it);
    // console.log(query.pt);
    // console.log(query.ru);
    // console.log(query.es);

    let where = "";

    if (query["en-starts-with"] !== undefined) {
      where += ' WHERE en LIKE "' + query["en-starts-with"] + '%"';
    } else {
      if (query.q !== undefined) {
        where += ' WHERE en LIKE "' + query.q + '"';

        if (query.exact !== undefined) {
          if (query.ar !== undefined) {
            where += ' OR ar_translated_1 LIKE "' + query.q + '"';
            where += ' OR ar_translated_2 LIKE "' + query.q + '"';
            where += ' OR ar_translated_3 LIKE "' + query.q + '"';
          }

          if (query.fr !== undefined) {
            where += ' OR fr_translated_1 LIKE "' + query.q + '"';
            where += ' OR fr_translated_2 LIKE "' + query.q + '"';
            where += ' OR fr_translated_3 LIKE "' + query.q + '"';
          }

          if (query.de !== undefined) {
            where += ' OR de_translated_1 LIKE "' + query.q + '"';
            where += ' OR de_translated_2 LIKE "' + query.q + '"';
            where += ' OR de_translated_3 LIKE "' + query.q + '"';
          }

          if (query.hi !== undefined) {
            where += ' OR hi_translated_1 LIKE "' + query.q + '"';
            where += ' OR hi_translated_2 LIKE "' + query.q + '"';
            where += ' OR hi_translated_3 LIKE "' + query.q + '"';
          }

          if (query.it !== undefined) {
            where += ' OR it_translated_1 LIKE "' + query.q + '"';
            where += ' OR it_translated_2 LIKE "' + query.q + '"';
            where += ' OR it_translated_3 LIKE "' + query.q + '"';
          }

          if (query.pt !== undefined) {
            where += ' OR pt_translated_1 LIKE "' + query.q + '"';
            where += ' OR pt_translated_2 LIKE "' + query.q + '"';
            where += ' OR pt_translated_3 LIKE "' + query.q + '"';
          }

          if (query.ru !== undefined) {
            where += ' OR ru_translated_1 LIKE "' + query.q + '"';
            where += ' OR ru_translated_2 LIKE "' + query.q + '"';
            where += ' OR ru_translated_3 LIKE "' + query.q + '"';
          }

          if (query.es !== undefined) {
            where += ' OR es_translated_1 LIKE "' + query.q + '"';
            where += ' OR es_translated_2 LIKE "' + query.q + '"';
            where += ' OR es_translated_3 LIKE "' + query.q + '"';
          }
        } else {
          if (query.ar !== undefined) {
            where += ' OR ar_search_keyword LIKE "%' + query.q + '%"';
          }

          if (query.fr !== undefined) {
            where += ' OR fr_search_keyword LIKE "%' + query.q + '%"';
          }

          if (query.de !== undefined) {
            where += ' OR de_search_keyword LIKE "%' + query.q + '%"';
          }

          if (query.hi !== undefined) {
            where += ' OR hi_search_keyword LIKE "%' + query.q + '%"';
          }

          if (query.it !== undefined) {
            where += ' OR it_search_keyword LIKE "%' + query.q + '%"';
          }

          if (query.pt !== undefined) {
            where += ' OR pt_search_keyword LIKE "%' + query.q + '%"';
          }

          if (query.ru !== undefined) {
            where += ' OR ru_search_keyword LIKE "%' + query.q + '%"';
          }

          if (query.es !== undefined) {
            where += ' OR es_search_keyword LIKE "%' + query.q + '%"';
          }
        }
      }
    }

    return where;
  }

  select(query) {
    const where = this.createWhere(query);
    const sql = "SELECT * FROM view_translation" + where;
    console.log(sql);

    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database("assets/translation.db");
      db.all(sql, (error, rows) => {
        if (error) {
          reject();
        }

        resolve(rows);
      });
    });
  }

  convertRows(rows, query) {
    return _.map(rows, (row) => {
      const converted = {};
      converted.en = row.en;

      if (query.ar !== undefined) {
        converted.ar = [];
        if (row.ar_translated_1) {
          converted.ar.push({
            translated: row.ar_translated_1,
            gender: row.ar_gender_1,
          });
        }

        if (row.ar_translated_2) {
          converted.ar.push({
            translated: row.ar_translated_2,
            gender: row.ar_gender_2,
          });
        }

        if (row.ar_translated_3) {
          converted.ar.push({
            translated: row.ar_translated_3,
            gender: row.ar_gender_3,
          });
        }
      }

      if (query.fr !== undefined) {
        converted.fr = [];
        if (row.fr_translated_1) {
          converted.fr.push({
            translated: row.fr_translated_1,
            gender: row.fr_gender_1,
          });
        }

        if (row.fr_translated_2) {
          converted.fr.push({
            translated: row.fr_translated_2,
            gender: row.fr_gender_2,
          });
        }

        if (row.fr_translated_3) {
          converted.fr.push({
            translated: row.fr_translated_3,
            gender: row.fr_gender_3,
          });
        }
      }

      if (query.de !== undefined) {
        converted.de = [];
        if (row.de_translated_1) {
          converted.de.push({
            translated: row.de_translated_1,
            gender: row.de_gender_1,
          });
        }

        if (row.de_translated_2) {
          converted.de.push({
            translated: row.de_translated_2,
            gender: row.de_gender_2,
          });
        }

        if (row.de_translated_3) {
          converted.de.push({
            translated: row.de_translated_3,
            gender: row.de_gender_3,
          });
        }
      }

      if (query.hi !== undefined) {
        converted.hi = [];
        if (row.hi_translated_1) {
          converted.hi.push({
            translated: row.hi_translated_1,
            gender: row.hi_gender_1,
          });
        }

        if (row.hi_translated_2) {
          converted.hi.push({
            translated: row.hi_translated_2,
            gender: row.hi_gender_2,
          });
        }

        if (row.hi_translated_3) {
          converted.hi.push({
            translated: row.hi_translated_3,
            gender: row.hi_gender_3,
          });
        }
      }

      if (query.it !== undefined) {
        converted.it = [];
        if (row.it_translated_1) {
          converted.it.push({
            translated: row.it_translated_1,
            gender: row.it_gender_1,
          });
        }

        if (row.it_translated_2) {
          converted.it.push({
            translated: row.it_translated_2,
            gender: row.it_gender_2,
          });
        }

        if (row.it_translated_3) {
          converted.it.push({
            translated: row.it_translated_3,
            gender: row.it_gender_3,
          });
        }
      }

      if (query.pt !== undefined) {
        converted.pt = [];
        if (row.pt_translated_1) {
          converted.pt.push({
            translated: row.pt_translated_1,
            gender: row.pt_gender_1,
          });
        }

        if (row.pt_translated_2) {
          converted.pt.push({
            translated: row.pt_translated_2,
            gender: row.pt_gender_2,
          });
        }

        if (row.pt_translated_3) {
          converted.pt.push({
            translated: row.pt_translated_3,
            gender: row.pt_gender_3,
          });
        }
      }

      if (query.ru !== undefined) {
        converted.ru = [];
        if (row.ru_translated_1) {
          converted.ru.push({
            translated: row.ru_translated_1,
            gender: row.ru_gender_1,
          });
        }

        if (row.ru_translated_2) {
          converted.ru.push({
            translated: row.ru_translated_2,
            gender: row.ru_gender_2,
          });
        }

        if (row.ru_translated_3) {
          converted.ru.push({
            translated: row.ru_translated_3,
            gender: row.ru_gender_3,
          });
        }
      }

      if (query.es !== undefined) {
        converted.es = [];
        if (row.es_translated_1) {
          converted.es.push({
            translated: row.es_translated_1,
            gender: row.es_gender_1,
          });
        }

        if (row.es_translated_2) {
          converted.es.push({
            translated: row.es_translated_2,
            gender: row.es_gender_2,
          });
        }

        if (row.es_translated_3) {
          converted.es.push({
            translated: row.es_translated_3,
            gender: row.es_gender_3,
          });
        }
      }

      return converted;
    });
  }

  start() {
    app.set("trust proxy", true);

    app.get("/api/translate", async (req, res) => {
      const parsed = url.parse(req.url, true);

      if (
        parsed.query.ar === undefined &&
        parsed.query.fr === undefined &&
        parsed.query.de === undefined &&
        parsed.query.hi === undefined &&
        parsed.query.it === undefined &&
        parsed.query.pt === undefined &&
        parsed.query.ru === undefined &&
        parsed.query.es === undefined
      ) {
        parsed.query.ar = true;
        parsed.query.fr = true;
        parsed.query.de = true;
        parsed.query.hi = true;
        parsed.query.it = true;
        parsed.query.pt = true;
        parsed.query.ru = true;
        parsed.query.es = true;
      }

      this.select(parsed.query).then((rows) => {
        // console.log(rows);
        const convertedRows = this.convertRows(rows, parsed.query);
        // console.log(convertedRows);
        const jsonString = JSON.stringify(convertedRows);
        // console.log(jsonString);
        res.send(jsonString);
      });
    });

    const host = process.env.HOST || "localhost";
    const port = process.env.PORT || 8080;

    app.listen(port, host, () => {
      console.log(`${host}:${port}`);
    });
  }
}

// class variables

module.exports = GenderAPI;
