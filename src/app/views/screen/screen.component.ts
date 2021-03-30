import {Component, OnInit} from '@angular/core';
import {ContentType, HttpWrapper} from '../../api/HttpWrapper';
import {DataTableDirective} from 'angular-datatables';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {

  public screen = {
    text: '',
    font: '',
    clean: false
  };

  public sendError = false;
  public sendErrorMessage = '';
  public sendSuccess = false;
  public sendSuccessMessage = '';
  private sendCanProceed = true;
  public dtOptions: DataTables.Settings = {};
  public screenHistory = [];
  public dt: DataTableDirective | undefined;

  constructor(public httpWrapper: HttpWrapper) {}

  ngOnInit(): void {

    this.httpWrapper.setEndpoint('screen-history').setContentType(ContentType.JSON).get(
      data => {

        // tslint:disable-next-line:forin
        for (const key in data) {
          const value = data[key];
          // @ts-ignore
          // tslint:disable-next-line:radix
          const date = new Date(parseInt(key));
          const minutes = '0' + date.getMinutes();
          const seconds = '0' + date.getSeconds();
          const record = {
            time: key,
            timeFormatted: date.getHours() + ':' + minutes.substr(-2) + ':'
              + seconds.substr(-2) + ' ' + date.getDate()
              + '-' + (date.getMonth() + 1) + '-' + date.getFullYear(),
            screen_text: value.screen_text,
            text_size: value.text_size,
            screen_cleaned: value.screen_cleaned
          };
          // @ts-ignore
          this.screenHistory.push(record);
        }
      }, err => {
        console.log(err);
      }
    );

    // @ts-ignore
    this.dtOptions = {
      order: [[0, 'desc']],
      language: {
        search: '<span style="color: white">Zoeken:</span>',
        searchPlaceholder: '',
        lengthMenu: '<span style="color: white">Laat _MENU_ records van tempratuur geschiedenis zien</span>',
        info: '<span style="color: white">Pagina _PAGE_ van de _PAGES_</span>',
        infoEmpty: '<span style="color: white">Geen tempratuur geschiedenis aanwezig.</span>',
        infoFiltered: '<span style="color: white">(Gefiltered op alle _MAX_ records)</span>',
        loadingRecords: '<span style="color: white">Tempratuur geschiedenis aan het laden.</span>',
        zeroRecords: '<span style="color: white">Geen tempratuur geschiedenis gevonden</span>',
        paginate: {
          next: '<span style="color: white">Volgende</span>',
          first: '<span style="color: white">Eerste</span>',
          last: '<span style="color: white">Laatste</span>',
          previous: '<span style="color: white">Vorige</span>'
        }
      },
    };

    // @ts-ignore
    this.dt.dtInstance.then((dtInstance: DataTables.Api) => {});
  }

  // tslint:disable-next-line:typedef
  public sendToScreen() {
    this.sendError = false;
    this.sendErrorMessage = '';

    if (this.screen.text === '') {
      this.sendError = true;
      this.sendCanProceed = false;
      this.sendErrorMessage = 'Geen screen tekst ingevoerd.';
    }

    if (this.screen.font === '') {
      this.sendError = true;
      this.sendCanProceed = false;
      this.sendErrorMessage = 'Geen font geselecteerd.';
    }

    if (this.sendCanProceed) {
      this.httpWrapper.setEndpoint('screen').setContentType(ContentType.JSON).setBody({
        text: this.screen.text,
        font: this.screen.font,
        clean: this.screen.clean
      }).post(data => {
        this.sendSuccess = true;
        this.sendSuccessMessage = 'Tekst op het scherm is gewijziged.';
      }, err => {
        console.log(err);
      });
    }

  }

}
