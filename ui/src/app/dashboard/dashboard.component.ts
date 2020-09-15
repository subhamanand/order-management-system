import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { environment } from '../../environments/environment';
import * as $ from 'jquery';
import "datatables.net";
import 'sweetalert2/src/sweetalert2.scss'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';
import { Chart } from 'angular-highcharts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {



  constructor(public dialog: MatDialog, private http: HttpClient, private router: Router) {

  }
  public username: string;
  public userid: string;
  posts: any;
  json_body = {};
  products: any;
  productList = [];
  // selectedDate= new FormControl(new Date());
  selectedDate: any;

  productSelected: any;
  selectedProductPrice: any;
  finalSalePrice: any;
  kpiTotalSales: any;
  kpiBestSelling: any;
  kpiLeastSelling: any;

  last3MonthSale: any;

  viewNewOrder = false;
  chart:Chart;


  ngOnInit(): void {



    this.getBestProducts();
    this.getHighVsLow();
    this.getAllProducts();
    this.getLast3MonthSales();
    this.getQuantityVsSale();


  }

  newOrder() {
    this.viewNewOrder = true;

  }


  getAllProducts() {
    var path = "sql_queries/getAllProducts.sql";
    var params = new Array();

    var reqBody = {
      "sqlPath": path,
      "parameters": params
    };
    this.http.post(environment.backendApiUrl + '/api/reporting/run-sql', reqBody).subscribe(data => {



      data["result"].forEach(element => {

        this.productList.push(element.product_name);

      });



    })

  }



  getBestProducts() {

    var path = "sql_queries/getBestSellingProducts.sql";
    var params = new Array();
    // params.push(this.userID);
    var reqBody = {
      "sqlPath": path,
      "parameters": params
    };
    this.http.post(environment.backendApiUrl + '/api/reporting/run-sql', reqBody).subscribe(data => {

      this.products = data["result"];

      $("#best_products_table").DataTable().destroy();
      $(document).ready(function () {
        $('#best_products_table').DataTable({
          "pagingType": "full_numbers",
          dom: 'Bfrtip',
          lengthMenu: [
            [100, -1],
            ['100 rows', 'Show all']
          ],
          "paging": false

        });
      });




    });

  }

  selectProduct(productSelected) {
    this.productSelected = productSelected;
    var path = "sql_queries/getProductPrice.sql";
    var params = new Array();
    params.push(productSelected);
    var reqBody = {
      "sqlPath": path,
      "parameters": params
    };
    this.http.post(environment.backendApiUrl + '/api/reporting/run-sql', reqBody).subscribe(data => {
      this.selectedProductPrice = data["result"][0]['price'];
      var sp = parseFloat(data["result"][0]['price']);

      var sale_price = sp + (sp * 0.105);
      var sale_price_including_gst = sale_price + (sale_price * 0.135);

      this.finalSalePrice = sale_price_including_gst.toFixed(2);



    })


  }

  saveOrder() {

    var date = String(this.selectedDate).slice(0, 15);
    var d = new Date(date);
    var dd = d.getDate();
    var mm = d.getMonth() + 1;
    var yyyy = d.getFullYear();

    var final_date = yyyy + "/" + mm + "/" + dd;
    var path = "sql_queries/createOrder.sql";
    var params = new Array();
    params.push(this.productSelected);
    params.push(final_date);
    params.push(this.finalSalePrice);

    var reqBody = {
      "sqlPath": path,
      "parameters": params
    };
    this.http.post(environment.backendApiUrl + '/api/reporting/run-sql', reqBody).subscribe(data => {
      this.getBestProducts();
      this.getHighVsLow();
      this.getLast3MonthSales();
      this.getQuantityVsSale();
  

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Order Created Successsfully',
        showConfirmButton: true
      })


    })




  }
  cancelOrder() {
    this.selectedProductPrice = '';
    this.selectedDate = null;
    this.productSelected = '';
    this.finalSalePrice = '';

    this.viewNewOrder = false;

  }

  getHighVsLow() {

    var path = "sql_queries/getHighLowKpi.sql";
    var params = new Array();

    var reqBody = {
      "sqlPath": path,
      "parameters": params
    };
    this.http.post(environment.backendApiUrl + '/api/reporting/run-sql', reqBody).subscribe(data => {

      this.kpiTotalSales = data['result'][0]['data'];
      this.kpiBestSelling = data['result'][1]['data'];
      this.kpiLeastSelling = data['result'][2]['data'];


    })




  }

  getLast3MonthSales() {

    var path = "sql_queries/getLast3MonthsSales.sql";
    var params = new Array();

    var reqBody = {
      "sqlPath": path,
      "parameters": params
    };
    this.http.post(environment.backendApiUrl + '/api/reporting/run-sql', reqBody).subscribe(data => {

      this.last3MonthSale = data["result"];




    })




  }


  getQuantityVsSale() {

    let _this = this;

    var path = "sql_queries/getQuantityVsAmountMonthly.sql";
    var params = new Array();

    var reqBody = {
      "sqlPath": path,
      "parameters": params
    };


    this.http.post(environment.backendApiUrl + '/api/reporting/run-sql',reqBody).subscribe(res => {


      var categories = [];
      var amount = [];
      var quantity=[];

      res['result'].forEach(element => {

        categories.push(element.month);
        amount.push(element.sales);
        quantity.push(element.quantity);

      });







      let chartObj: any = {
        chart: {
          type: 'column'
      },
      title: {
          text: ''
      },
      xAxis: {
          categories: categories,
          crosshair: true
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Amount'
          }
      },
      credits: false,
        tooltip: {
          pointFormat: '{series.name}: <b>{point.y}</b>'
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
            color: "#648F42"
          },
          series: {
            cursor: 'pointer',
            point: {
              
            }
          }
        },
      series: [{
          name: 'Quantity',
          data: quantity,
          color:"#53B4CF"
  
      }, {
          name: 'Amount',
          data: amount,
          color:'#41803E'
  
      }]
      }



      _this.chart = new Chart(chartObj);



    })



  }

}
