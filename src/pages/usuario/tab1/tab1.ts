import { BloqueapiProvider } from './../../../providers/bloqueapi/bloqueapi';
import { Component, ViewChild, ElementRef, Provider } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Content } from 'ionic-angular';
import marked from 'marked';
import { Toast } from '@ionic-native/toast';
import { SteemconnectProvider } from '../../../providers/steemconnect/steemconnect';
import SimpleMDE from 'simplemde';

/**
 * Generated class for the Tab1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tab1',
  templateUrl: 'tab1.html',
})
export class Tab1Page {
  @ViewChild(Content) content: Content;
  toggleVal = false;
  plainText;

  tittle;

  tags;
  simplemde;
  constructor(public alertCtrl: AlertController,
    private toast: Toast, public navCtrl: NavController,
    public navParams: NavParams, private _SteemconnectProvider: SteemconnectProvider
    , public loadingCtrl: LoadingController,
    private _API: BloqueapiProvider, private elRef: ElementRef) {
  }

  ionViewDidLoad() {
    this.setValueifExist(); let a:any = "";
    this.content = a;
  }
  ionViewDidEnter() {

    if(localStorage.getItem("smde_textMarkdownEditor")){
      this.content = marked(localStorage.getItem("smde_textMarkdownEditor"));
    }
    if (!this.simplemde) {
      this.simplemde = new SimpleMDE({
        autofocus: true,
        forceSync: true,
        hideIcons: ["guide", "fullscreen","preview"],
        autosave: {
          enabled: true,
          uniqueId: "textMarkdownEditor",
          delay: 1000,
        },
        element: document.getElementById("editor"),
        showIcons: ["code", "table", "horizontal-rule", "|", "side-by-side"],
        insertTexts: {
          horizontalRule: ["", "\n\n-----\n\n"],
          image: ["![](http://", ")"],
          link: ["[", "](http://)"],
          table: ["", "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n"],
        },

        lineWrapping: false,
        parsingConfig: {
          allowAtxHeaderWithoutSpace: true,
          strikethrough: false,
          underscoresBreakWords: true,
        },
      });
      let simplemde = this.simplemde;
      var content = this.content;
      var callback = (res):Promise<any> => {
        return new Promise((resolve, reject) => {
          if (res) {
            resolve(res);
          } else {
            reject("");
          }
        }).then(res => {
          var a: any = "";
          this.content = res + a;
        }, err => {
          this.content = err;
        });

      }

      simplemde.codemirror.on("change", function () {

        content = marked(simplemde.value());
       // console.log(content);
        callback(content);

      });

    }
  }



  convert() {
    if (this.toggleVal == true) {
      if (this.plainText && this.plainText != '') {
        let plainText = this.plainText
        let markdownText = marked(plainText.toString())
        markdownText = markdownText + "<br> Post creado utilizando la app de prueba android de bloque64";
        this.content = markdownText;
      } else {
        this.toggleVal = false
      }
    }
  }

  save() {
    this.toast.show(`guardando`, '5000', 'center').subscribe(
      toast => {
        localStorage.removeItem("post");
        const post = {
          tittle: this.tittle,
          body: this.plainText
        }
        localStorage.setItem("post", JSON.stringify(post));
      }
    );
  }

  createPermlink(tittle: string) {
    let noEspecial = tittle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').trim().toLowerCase();
    return noEspecial.replace(/\s/g, "-")
  }

  setValueifExist() {
    if (localStorage.getItem("post")) {
      this.tittle = JSON.parse(localStorage.getItem("post")).tittle;
      this.plainText = JSON.parse(localStorage.getItem("post")).body;
    }
  }

  tagCheck() {

    return this.checkMaxLeng() && this.checkExpecialCharacters()
      && this.countCheck() && this.checkInitialNumber()
      && this.checkMaximunSize();

  }

  checkMaxLeng() {
    let tagArray: string = this.tags.split(" ");

    if (tagArray.length > 4) {
      this.showAlert("error", "El maximo de tags es 4");
      return false;
    }
    else if (tagArray.length <= 0) {
      this.showAlert("error", "Debes colocar al menos 1 tag");
      return false;
    }
    return true;
  }

  checkExpecialCharacters() {
    if (/[.*+?^${}()|[\]\\]/g.test(this.tags)) {
      this.showAlert("error", "Usa sólo letras minúsculas, dígitos y un guión");
      return false;
    }
    return true;
  }

  countCheck() {
    let cuenta = 0;
    let tagArray: string = this.tags.split(" ");
    for (let index = 0; index < tagArray.length; index++) {
      let posicion = tagArray[index].indexOf("-");
      while (posicion != -1) {
        cuenta++;
        posicion = tagArray.indexOf("-", posicion + 1);
      }

      if (cuenta > 1) {
        this.showAlert("error", "Solo se puede usar un guion");
        return false;
      } else {
        return true;
      }

    }

    return true;

  }

  checkInitialNumber() {
    let tagArray: string = this.tags.split(" ");
    for (let index = 0; index < tagArray.length; index++) {
      var res = tagArray[index].substring(0, 1);
      if (!isNaN(parseFloat(res)) && isFinite(parseFloat(res))) {
        this.showAlert("error", "no puedes iniciar con 1 numero siempre por letras");
        return false;
      } else {

      }
    }
    return true;
  }

  checkMaximunSize() {
    let tagArray: string = this.tags.split(" ");
    for (let index = 0; index < tagArray.length; index++) {
      if (tagArray[index].length > 24) {
        this.showAlert("error", "la distancia maxima de un tag es 24 caracteres");
        return false;
      }
    }
    return true;
  }

  showAlert(tittle, subTitle) {
    let alert = this.alertCtrl.create({
      title: tittle,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

  post() {

    if (this.plainText && this.plainText != ''
      && this.tittle && this.tittle != ''
      && this.tags && this.tags != '' && this.tagCheck()) {
      let author = JSON.parse(localStorage.getItem('dataccess')).username;
      let permlink = this.createPermlink(this.tittle);
      let body = marked(this.plainText.toString()) + "<br> Post creado utilizando la app de prueba android de bloque64";
      let jsonMetadata = { tags: this.tags.split(" ") };
      console.log("estos son los metadatos que pueden causar el error", jsonMetadata);
      console.log("el permlink debe estar causando problemas", permlink);
      let loader = this.loadingCtrl.create({
        content: "Cargando"
      });
      loader.present();

      let RevisionBody = {
        autor: author,
        token: JSON.parse(localStorage.getItem('dataccess')).access_token,
        title: this.tittle,
        cuerpo: this.plainText.toString(),
        image: "imageprueba",
        evaluado: false,
        formateado: false,
        curado: false,
        categoria: this.tags.split(" ")[0],
      };
      this._API.enviarARevision(RevisionBody).then(res => {
        loader.dismiss();
        this.showAlert('Perfecto', 'Se posteo correctamente');
        localStorage.removeItem("post");

        this.tittle = "";
        this.plainText = "";

      }, err => {
        loader.dismiss();
        this.showAlert('Error', 'Se produjo un error al postear, intenta nuevamente o contacta al administrador si el problema continua');
        console.log("este es el error en post : ", err);

      }).catch(err => {
        loader.dismiss();
        this.showAlert('Error', 'Se produjo un error al postear, intenta nuevamente o contacta al administrador si el problema continua');


      });

      /*
      this._SteemconnectProvider.Comment('', 'bloque64', author, permlink, this.tittle, body, jsonMetadata).then(res => {
        loader.dismiss();
        this.showAlert('Perfecto', 'Se posteo correctamente');
        localStorage.removeItem("post");

        this.tittle = "";
        this.plainText = "";

      }).catch(err => {
        loader.dismiss();
        this.showAlert('Error', 'Se produjo un error al postear, intenta nuevamente o contacta al administrador si el problema continua');


      });*/

    }

  }

}
