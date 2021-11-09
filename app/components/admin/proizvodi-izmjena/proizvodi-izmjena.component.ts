import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
// tslint:disable-next-line: max-line-length
import { HtmlEditorService, ImageService, LinkService, RichTextEditorComponent, ToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { Proizvod } from 'src/app/models/Proizvod';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { KategorijaProizvoda } from 'src/app/models/KategorijaProizvoda';
import { AngularFireStorage } from '@angular/fire/storage';
import { ProizvodiService } from 'src/app/services/proizvodi.service';
import { MyImageService } from 'src/app/services/my-image.service';
import { KategorijeProizvodaService } from 'src/app/services/kategorije-proizvoda.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}



@Component({
  selector: 'app-proizvodi-izmjena',
  templateUrl: './proizvodi-izmjena.component.html',
  styleUrls: ['./proizvodi-izmjena.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class ProizvodiIzmjenaComponent implements OnInit {
  private itemDoc: AngularFirestoreDocument<Proizvod>;
  @ViewChild('fromRTE')
  private rteEle: RichTextEditorComponent;
  public value: string = null;
  forma: FormGroup;
  url: 'https://console.firebase.google.com/u/2/project/obrazovanje-odraslih/storage/obrazovanje-odraslih.appspot.com/files~2FVijesti';
  id: string;
  category: string;
  selectedFile: ImageSnippet;
  proizvod: Proizvod;
  selectedObj: string;
  kategorije: KategorijaProizvoda[];

  constructor(private storage: AngularFireStorage,
              private proizvodiService: ProizvodiService,
              private imageService: MyImageService,
              private kategorijeService: KategorijeProizvodaService,
              private router: Router,
              private route: ActivatedRoute,
              private fm: FlashMessagesService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.proizvodiService.getProizvod('proizvodi', this.id).subscribe(proizvod => {
      this.proizvod = proizvod;
      this.selectedObj = this.proizvod.Kategorija;
      this.value = this.proizvod.Sadrzaj;
      const ref = this.storage.ref(`Proizvodi/${this.proizvod.Podnaslov}`);
      this.proizvod.Slika = ref.getDownloadURL();
    });
    this.kategorijeService.getKategorijeProizvodi().subscribe(kategorije => {
      this.kategorije = kategorije;
    });
  }
  rteCreated(): void {
    this.rteEle.element.focus();
}
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
    });
    reader.readAsDataURL(file);

  }
  onSubmit({value, valid}: {value: Proizvod, valid: boolean}) {
    if (!valid) {
      console.log(valid);
    } else {
        if (this.selectedFile === undefined) {
          this.proizvod.Kategorija = this.selectedObj;
          this.proizvod.Sadrzaj = this.value;
          this.proizvodiService.updateProizvod(this.proizvod.Id, this.proizvod);
          this.router.navigate([`/dashboard/proizvodi/`]);
          this.fm.show('Proizvod je uspješno izmjenjen', {cssClass: 'alert-success', timeout: 3000});
        } else {
          this.proizvod.Kategorija = this.selectedObj;
          this.proizvod.Sadrzaj = this.value;
          this.proizvodiService.updateProizvod(this.proizvod.Id, this.proizvod);
          this.imageService.deleteImage(this.proizvod.Podnaslov, 'Proizvodi');
          this.imageService.uploadImage(this.selectedFile.file, this.proizvod.Podnaslov, 'Proizvodi');
          this.router.navigate([`/dashboard/proizvodi/`]);
          this.fm.show('Proizvod je uspješno izmjenjen', {cssClass: 'alert-success', timeout: 3000});
        }
    }
  }
  checkValue(id: string, fokus: boolean) {
    this.itemDoc = this.proizvodiService.getProizvodValue(id);
    this.itemDoc.update({Fokus: fokus})
    .then(() => {
      console.log('Document successfully updated!');
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error('Error updating document: ', error);
    });
  }
}
