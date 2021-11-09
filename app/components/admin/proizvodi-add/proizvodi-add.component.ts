import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { KategorijaProizvoda } from 'src/app/models/KategorijaProizvoda';
import { Proizvod } from 'src/app/models/Proizvod';
import { KategorijeProizvodaService } from '../../../services/kategorije-proizvoda.service';
import { ProizvodiService } from '../../../services/proizvodi.service';
import { ComfirmationDialogService } from '../../confirmation-dialog/comfirmation-dialog.service';
import { MyImageService } from '../../../services/my-image.service';
import { HtmlEditorService, ImageService, LinkService, RichTextEditorComponent, ToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { NgForm } from '@angular/forms';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}


@Component({
  selector: 'app-proizvodi-add',
  templateUrl: './proizvodi-add.component.html',
  styleUrls: ['./proizvodi-add.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class ProizvodiAddComponent implements OnInit {

selectedFile: ImageSnippet;
  kategorije: KategorijaProizvoda[];
  selectedObj = 'Odaberite kategoriju';
  constructor(private proizvodiService: ProizvodiService,
              private kategorijeService: KategorijeProizvodaService,
              private router: Router,
              private imageService: MyImageService,
              private fm: FlashMessagesService,
              private cds: ComfirmationDialogService) { }
  @ViewChild('fromRTE')
  private rteEle: RichTextEditorComponent;
  public value: string = null;
  proizvod: Proizvod = {
    Naslov: '',
    Podnaslov: '',
    Sadrzaj: '',
    Kategorija: '',
    Datum: new Date(),
    Fokus: false,
    Objava: ''
  };
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];

    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
    });
    reader.readAsDataURL(file);
  }
    rteCreated(): void {
      this.rteEle.element.focus();
  }

  ngOnInit(): void {
    this.kategorijeService.getKategorijeProizvodi().subscribe(kategorije => {
      this.kategorije = kategorije;
    });
  }

  onSubmit(form: NgForm): void {
      if (form.invalid || this.selectedObj === 'Odaberite kategoriju') {
        this.cds.alert('Validacija', 'Popunite sva tražena polja');

      } else {
        this.proizvod.Kategorija = this.selectedObj;
        this.proizvod.Sadrzaj = this.rteEle.value;
        this.proizvodiService.DodajProizvod(this.proizvod);
        this.router.navigate([`dashboard/proizvodi`]);
        this.imageService.uploadImage(this.selectedFile.file, this.proizvod.Podnaslov, 'Proizvodi');
        this.fm.show('Proizvod je uspješno kreiran', {cssClass: 'alert-success', timeout: 3000});
      }
  }
}
