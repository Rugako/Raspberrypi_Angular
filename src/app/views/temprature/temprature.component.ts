import {Component, OnInit} from '@angular/core';
import {ContentType, HttpWrapper} from '../../api/HttpWrapper';
import {DataTableDirective} from 'angular-datatables';

@Component({
  selector: 'app-temprature',
  templateUrl: './temprature.component.html',
  styleUrls: ['./temprature.component.scss']
})
export class TempratureComponent implements OnInit {

  public tempHistory = [];
  public dtOptions: DataTables.Settings = {};
  public dt: DataTableDirective | undefined;

  constructor(public httpWrapper: HttpWrapper) {
  }

  ngOnInit(): void {

    this.httpWrapper.setEndpoint('temp-history').setContentType(ContentType.JSON).get(data => {
      // tslint:disable-next-line:forin
      for (const key in data) {
        const record = data[key];
        // tslint:disable-next-line:radix
        const date = new Date(parseInt(key));
        const minutes = '0' + date.getMinutes();
        const seconds = '0' + date.getSeconds();
        const newArrayPush = {
          time: key,
          timeFormatted: date.getHours() + ':' + minutes.substr(-2) + ':'
            + seconds.substr(-2) + ' ' + date.getDate()
            + '-' + (date.getMonth() + 1) + '-' + date.getFullYear(),
          temperature: record.tempCelsius
        };
        // @ts-ignore
        this.tempHistory.push(newArrayPush);
        console.log(record);
      }
    }, err => {

    });

    // @ts-ignore
    this.dtOptions = {
      order: [[0, 'desc']],
      language: {
        search: '<span style="color: white">Zoeken:</span>',
        searchPlaceholder: '',
        lengthMenu: '<span style="color: white">Laat _MENU_ records van scherm geschiedenis zien</span>',
        info: '<span style="color: white">Pagina _PAGE_ van de _PAGES_</span>',
        infoEmpty: '<span style="color: white">Geen scherm geschiedenis aanwezig.</span>',
        infoFiltered: '<span style="color: white">(Gefiltered op alle _MAX_ records)</span>',
        loadingRecords: '<span style="color: white">Scherm geschiedenis aan het laden.</span>',
        zeroRecords: '<span style="color: white">Geen scherm geschiedenis gevonden</span>',
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

}
