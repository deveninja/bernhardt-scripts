/**
 * @description - Include this dependency scripts into the script editor
 * =============================================================================================================
 *    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" type="text/javascript"></script>
 *    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
 *    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
 *    <script type="text/javascript" src="/_layouts/15/SP.dateTimeUtil.js"></script>
 * =============================================================================================================
 */

var form = '';
var itemData = {};


JSRequest.EnsureSetup();
itemId = JSRequest.QueryString["ID"];

function getitemsbyID(itemId) {

   var listName = location.href.split('Lists/')[1].split('/')[0];

   var clientContext = new SP.ClientContext.get_current();
   var masterlist = clientContext.get_web().get_lists().getByTitle(listName);
   masterListItem = masterlist.getItemById(itemId);
   clientContext.load(masterListItem);
   clientContext.executeQueryAsync(
      Function.createDelegate(this, this.onQuerySucceeded),
      Function.createDelegate(this, this.onQueryFailed)
   );
}


function onQuerySucceeded() {   
   console.log('Request succeeded. \n\nRetrieved Item is: ', masterListItem.get_fieldValues());
   itemData = { ...masterListItem.get_fieldValues() }
}

function onQueryFailed(sender, args) {
   console.log('Request failed. \nError: ' + args.get_message() + '\nStackTrace: ' + args.get_stackTrace());
}

getitemsbyID(parseInt(itemId));



function printwebpart(webpartid)
{
   // var WebPartElementID = webpartid;
   // var bolWebPartFound = false;
   // var WebPartData = document.getElementById(WebPartElementID);
   // var HeadData= document.getElementsByTagName("HEAD");
   // console.log(WebPartData)
   // console.log(HeadData)
   function transformDataToFriendlyDate(item){
      if(!item){
         return '----';
      }
      return new Date(item).format('MM/dd/yyyy');
   }

   function validateEmptyitem(item){
      if(!item){
         return '----';
      }
      return item;
   }

   form += '<style>';
   form += 'html {box-sizing: border-box;}';
   form += 'form {box-sizing: border-box;margin: auto;height: 100%;}';
   form += 'input {box-sizing: border-box;width: 100%;padding: 10px;}';
   form += '.col2 {display: inline-block;width: 32%; }';
   form += '.col4 {display: inline-block;width: 23.5%; }';
   form += '.col2 input, textarea {border: unset; }';
   form += '.col4 input, textarea {border: unset; }';
   form += '.clear-fix { clear: both;}';
   form += '@media print {input, textarea {box-sizing: border-box;display: block;width: 100%;padding: 10px 0px; font-weight:bold; margin-bottom: .2rem; font-size: 10px}.col2 {display: inline-block;width: 32%;}.col2 input, textarea {border: unset; } .col4 {display: inline-block;width: 23.5%;}.col4 input, textarea {border: unset; }p {font-size: 8px;}} label {font-size: 10px} table {width: 100%; border-collapse: collapse;} th {font-weight: 400; font-size: 12px}';
   form += 'table, tr, td {border: 1px solid rgba(0,0,0,0.5); font-size: 10px;}';
   form += 'thead {background-color: #ffffff;}';
   form += 'th {text-align: center;}'
   form += 'span {font-size: 10px;}'
   form += '</style>';


   form += '<form action="">';
   form += '<fieldset>';
   form += '<legend><h4>RUSH - REPAIR PARTS ORDER</h4></legend>';
   form += '<small>Post Office Box 740 Lenoir North Carolina 28645</small>'
   form += '<br /><br />'

   // First Section
   // First Column
   form += '<div class="col2">';
      form += '<label for="author">Author:</label>';
      form += '<input class="input-inline" type="text" name="" id="author" value="' + validateEmptyitem(itemData.BernhardtAuthor) + '">';

      form += '<label for="qty">Tracking No:</label>';
      form += '<input class="input-inline" type="text" name="" id="qty" value="' + validateEmptyitem(itemData.BernhardtTrackingNo) + '">';

      form += '<label for="desciption">Date Shipped:</label>';
      form += '<input class="input-inline" type="text" name="" id="desciption" value="' + transformDataToFriendlyDate(itemData.BernhardtDateShipped) + '">';
   form += '</div>';

   // Second Column
   form += '<div class="col2">';
      form += '<label for="finish">Ack No:</label>';
      form += '<input class="input-inline" type="text" name="" id="finish" value="' + validateEmptyitem(itemData.BernhardtAckNo) + '">';

      form += '<label for="status">Ack Date:</label>';
      form += '<input class="input-inline" type="text" name="" id="status" value="' + transformDataToFriendlyDate(itemData.BernhardtAckDate) + '">';

      form += '<label for="ackNum">Status:</label>';
      form += '<input class="input-inline" type="text" name="" id="ackNum" value="' + validateEmptyitem(itemData.BernhardtStatus) + '">';
   form += '</div>';

   // Third Column
   form += '<div class="col2">';
      form += '<label for="finish">From:</label>';
      form += '<input class="input-inline" type="text" name="" id="finish" value="' + validateEmptyitem(itemData.BernhardtFrom) + '">';

      form += '<label for="status">Shipping Note:</label>';
      form += '<input class="input-inline" type="text" name="" id="status" value="' + validateEmptyitem(itemData.BernhardtShippingNote) + '">';

      form += '<label for="ackNum">Plant:</label>';
      form += '<input class="input-inline" type="text" name="" id="ackNum" value="' + validateEmptyitem(itemData.BernhardtPlant) + '">';
   form += '</div>';
   form += '<div class="clear-fix"></div>';

   // Second Section
   // First Column
   form += '<div class="col2">';
      form += '<span style="font-weight: bold; text-decoration: underline;">SOLD TO:</span>';
      form += '<br />';

      form += '<label for="author">Customer Acct No:</label>';
      form += '<input class="input-inline" type="text" name="" id="author" value="' + validateEmptyitem(itemData.BernhardtCustAcctNo) + '">';

      form += '<label for="qty">Sold To Dealer:</label>';
      form += '<input class="input-inline" type="text" name="" id="qty" value="' + validateEmptyitem(itemData.BernhardtSoldToDealer) + '">';

      form += '<label for="desciption">Sold To Address:</label>';
      form += '<input class="input-inline" type="text" name="" id="desciption" value="' + validateEmptyitem(itemData.BernhardtSoldToAddress) + '">';

      form += '<label for="author">Sold To Address1:</label>';
      form += '<input class="input-inline" type="text" name="" id="author" value="' + validateEmptyitem(itemData.BernhardtSoldToAddress1) + '">';

      form += '<label for="author">Sold To City:</label>';
      form += '<input class="input-inline" type="text" name="" id="author" value="' + validateEmptyitem(itemData.BernhardtSoldToCity) + ' ' + validateEmptyitem(itemData.BernhardtSoldToState) + ', ' + validateEmptyitem(itemData.BernhardtSoldToZip) + '">';

      form += '<label for="author">Ship Via:</label>';
      form += '<input class="input-inline" type="text" name="" id="author" value="' + validateEmptyitem(itemData.BernhardtShipVia) + '">';
   form += '</div>';

   // Second Column
   form += '<div class="col2">';
      form += '<span style="font-weight: bold; text-decoration: underline;">SHIP TO:</span>';
      form += '<br />';
      
      form += '<label for="author" style="dispaly: hidden;">--------</label>';
      form += '<input class="input-inline" type="text" name="" id="author" value="--------" style="dispaly: hidden;">';
      
      form += '<label for="author">Ship To Dealer:</label>';
      form += '<input class="input-inline" type="text" name="" id="author" value="' + validateEmptyitem(itemData.BernhardtShipToDealer) + '">';

      form += '<label for="author">Ship To Address:</label>';
      form += '<input class="input-inline" type="text" name="" id="author" value="' + validateEmptyitem(itemData.BernhardtShipToAddress) + '">';

      form += '<label for="author">Ship To Address1:</label>';
      form += '<input class="input-inline" type="text" name="" id="author" value="' + validateEmptyitem(itemData.BernhardtShipToAddress1) + '">';

      form += '<label for="author">Ship To City:</label>';
      form += '<input class="input-inline" type="text" name="" id="author" value="' + validateEmptyitem(itemData.BernhardtShipToCity) + ' ' + validateEmptyitem(itemData.BernhardtShipToState) + ', ' + validateEmptyitem(itemData.BernhardtShipToZip) + '">';

      form += '<label for="author">Terms:</label>';
      form += '<input class="input-inline" type="text" name="" id="author" value="' + validateEmptyitem(itemData.BernhardtTerms) + '">';
   form += '</div>';

   // Third Column
   form += '<div class="col2">';        

      form += '<label for="author">Order No.:</label>';
      form += '<input class="input-inline" type="text" name="" id="author" value="' + validateEmptyitem(itemData.BernhardtOrderNo) + '">';

      form += '<label for="author">Dept No:</label>';
      form += '<input class="input-inline" type="text" name="" id="author" value="' + validateEmptyitem(itemData.BernhardtDeptNo) + '">';

      form += '<label for="author">Est. Ship Week:</label>';
      form += '<input class="input-inline" type="text" name="" id="author" value="' + transformDataToFriendlyDate(itemData.BernhardtEstShipWkDate) + '">';

      form += '<label for="author">Tag For:</label>';
      form += '<input class="input-inline" type="text" name="" id="author" value="' + validateEmptyitem(itemData.BernhardtTagFor) + '">';
      
      form += '<label for="author" style="display: hidden;">--------</label>';
      form += '<input class="input-inline" type="text" name="" id="author" value="--------" style="display: hidden;">';

      form += '<label for="author" style="display: hidden;">--------</label>';
      form += '<input class="input-inline" type="text" name="" id="author" value="--------" style="display: hidden;">';
   form += '</div>';

   form += '<div class="clear-fix"></div>';


   // TABLE
   form += '<table>';

      form += '<thead>';
         form += '<tr>';
            form += '<th width="5%">Line No</th>';
            form += '<th width="5%">QTY</th>';
            form += '<th width="10%">Item Number</th>';
            form += '<th width="10%">Finish Code</th>';
            form += '<th width="20%">Description</th>';
            form += '<th width="10%">Fabric Number</th>';
            form += '<th width="15%">Reason</th>';
            form += '<th width="15%">Reference</th>';
            form += '<th width="10%">Charge</th>';
         form += '</tr>';
      form += '</thead>';


      form += '<tbody>';
         form += '<tr>';
            form += '<td>1</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtQty1) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtItemNo1) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtFinishCode1) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtDescription1) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtFabricNo1) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtReason1) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtReference1) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtCharge1) + '</td>';
         form += '</tr>';

         form += '<tr>';
            form += '<td>2</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtQty2) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtItemNo2) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtFinishCode2) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtDescription2) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtFabricNo2) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtReason2) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtReference2) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtCharge2) + '</td>';
         form += '</tr>';

         form += '<tr>';
            form += '<td>3</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtQty3) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtItemNo3) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtFinishCode3) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtDescription3) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtFabricNo3) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtReason3) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtReference3) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtCharge3) + '</td>';
         form += '</tr>';

         form += '<tr>';
            form += '<td>4</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtQty4) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtItemNo4) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtFinishCode4) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtDescription4) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtFabricNo4) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtReason4) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtReference4) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtCharge4) + '</td>';
         form += '</tr>';

         form += '<tr>';
            form += '<td>5</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtQty5) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtItemNo5) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtFinishCode5) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtDescription5) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtFabricNo5) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtReason5) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtReference5) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtCharge5) + '</td>';
         form += '</tr>';

         form += '<tr>';
            form += '<td>6</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtQty6) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtItemNo6) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtFinishCode6) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtDescription6) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtFabricNo6) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtReason6) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtReference6) + '</td>';
            form += '<td>' + validateEmptyitem(itemData.BernhardtCharge6) + '</td>';
         form += '</tr>';
      form += '</tbody>';

   form += '</table>';

   form += '<br />';

   form += '<div class="col2">';
      form += '<label for="author">Insured Value:</label>';
      form += '<input class="input-inline" type="text" name="" id="author" value="' + validateEmptyitem(itemData.BernhardtInsured) + '">';
   form += '</div>';
   form += '<div class="col2">';
      form += '<label for="author">Notes:</label>';
      form += '<p>'+ validateEmptyitem(itemData.BernhardtNotes) + '</p>';
   form += '</div>';
   form += '<div class="col2">';
   form += '</div>';

   form += '<div class="clear-fix"></div>';    
   
   

   // Divider 
   form += '<hr />';

   form += '<div class="col4">';
      form += '<label for="author">To:</label>';
      form += '<br />';
      form += '<br />';
      form += '<span>'+ validateEmptyitem(itemData.BernhardtShipDealer) + '</span><br />';
      form += '<span>'+ validateEmptyitem(itemData.BernhardtShipAddress) + '</span><br />';
      form += '<span>'+ validateEmptyitem(itemData.BernhardtShipAddressCont) + '</span><br />';
      form += '<span>'+ validateEmptyitem(itemData.BernhardtShipCity) + '</span><br />';
      form += '<span>'+ validateEmptyitem(itemData.BernhardtShipState) + '</span><br />';
      form += '<span>'+ validateEmptyitem(itemData.BernhardtShipZip) + '</span><br />';
   form += '</div>';

   form += '<div class="col4">';
      form += '<label for="author">PO No:</label>';
      form += '<input class="input-inline" type="text" name="" id="author" value="' + validateEmptyitem(itemData.BernhardtPoNo) + '">';
      form += '<label for="author">Ship Item:</label>';
      form += '<input class="input-inline" type="text" name="" id="author" value="' + validateEmptyitem(itemData.BernhardtShipItem) + '">';
      form += '<label for="author">Ship Ack No:</label>';
      form += '<input class="input-inline" type="text" name="" id="author" value="' + validateEmptyitem(itemData.BernhardtShipAckNo) + '">';
   form += '</div>';

   form += '<div class="col4">';
      form += '<label for="author">Ship Dept:</label>';
      form += '<input class="input-inline" type="text" name="" id="author" value="' + validateEmptyitem(itemData.BernhardtShipDept) + '">';
      form += '<label for="author">Ship Finish Code:</label>';
      form += '<input class="input-inline" type="text" name="" id="author" value="' + validateEmptyitem(itemData.BernhardtShipFinishCode) + '">';
   form += '</div>';

   form += '<div class="col4">';
      form += '<label for="author">Ship Tag:</label>';
      form += '<input class="input-inline" type="text" name="" id="author" value="' + validateEmptyitem(itemData.BernhardtShipTag) + '">';
      form += '<label for="author">DESCRIPTION:</label>';
      form += '<input class="input-inline" type="text" name="" id="author" value="PACKING LIST ENCLOSED">';
   form += '</div>';


   // Bernhardt Details



   // Print the form
   PrintingWindow = window.open("");
   PrintingWindow.document.write(form);
   PrintingWindow.print();
   form = '';
   PrintingWindow.close();
}


/**
 * @description - This is the button that will be added into the script editor
 * ============================================================================================================================================
 *    <INPUT type="button" onclick="printwebpart('ctl00_ctl40_g_cd65c167_6765_4175_b108_5ea47e1b2cf2_FormControl0')" value="Print This Form"/>
 * ============================================================================================================================================
*/
