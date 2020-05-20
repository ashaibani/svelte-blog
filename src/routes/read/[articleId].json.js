
import Parse from 'parse/dist/parse';


export function get(req, res, next) {
    initServerParse()
    const { articleId } = req.params;
    const Article = Parse.Object.extend("Article");
    const query = new Parse.Query(Article);
    query.get(articleId).then(
        object => {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end({
                id: object.id,
                title: object.get("title"),
                desc: object.get("shortDescription"),
                content: object.get("content"),
                createdAt: object.createdAt.toLocaleString("en-GB", {
                    hour: "numeric",
                    minute: "2-digit",
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                })
            });
        },
        error => {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            });
    
            res.end(JSON.stringify({
                message: error
            }));
        }
    );

}

function initServerParse() {
    Parse.serverURL = "https://api.m-a.me/parse";
    Parse.initialize(
      "XWRqEdUNs6uVxo8xUk7j4Z3pCZ4ozbqw",
      "",
      "NMvCRYdHjsU7r9aVMqqwTiJpnSpkgnJT"
    );
  }
