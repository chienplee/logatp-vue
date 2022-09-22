<template>
  <!-- <Main> -->
    
  <div> 
    <!-- <p>{{formState.experienceData}}</p> -->
    <div style="display:none">
      <!-- <button @click="exportCSV">Export</button> -->
      <table >							

        <tr >
          <th class="download">objectId</th>
          <th class="download" >realmID</th>
          <th class="download">firstName</th>
          <th class="download">lastName</th>
          <th class="download">position</th>
          <th class="download">employeeId</th>
          <th class="download">licenceNumber</th>
          <th class="download">nationality</th>
          <th class="download">notes</th>
          <th class="download">isSelf</th>
        </tr>
        <tr v-for="row in formState.crewsData" :key="row">
          <td class="download">{{row.id}}</td>
          <td class="download">{{row.realmId}}</td>
          <td class="download">{{row.firstName}}</td>
          <td class="download">J{{row.firstName}}</td>
          <td class="download">{{row.Position}}</td>
          <td class="download">{{row.EmployeeId}}</td>
          <td class="download">{{row.LicenceNumber}}</td>
          <td class="download">{{row.Nationality}}</td>
          <td class="download">{{row.Note}}</td>
          <td class="download">{{row.isSelf}}</td>

        </tr>

      </table>
    </div>
    <div style="display:none">

      <table>

        <tr>
          <th class="download1">objectId</th>
          <th class="download1">realmID</th>
          <th class="download1" >flightDate</th>
          <th class="download1">flightNumber</th>
          <th class="download1">aircraftType</th>
          <th class="download1">aircraftRegistration</th>
          <th class="download1">aircraftID</th>
          <th class="download1">departure</th>
          <th class="download1">destination</th>
          <th class="download1">outTime</th>
          <th class="download1">offTime</th>
          <th class="download1">onTime</th>
          <th class="download1">inTime</th>
          <th class="download1">nightTime</th>
          <th class="download1">pfTakeoff</th>
          <th class="download1">pfLanding</th>
          <th class="download1">picTime</th>
          <th class="download1">autoland</th>
          <th class="download1" >goAround</th>
          <th class="download1">diverted</th>
          <th class="download1">blockTime</th>
          <th class="download1">flightTime</th>
          <th class="download1">crew2</th>
          <th class="download1">crew3</th>			
          <th class="download1">crew4</th>
          <th class="download1">approachType</th>
          <th class="download1">totalPax</th>
          <th class="download1">totalPayload</th>
          <th class="download1">flightPlanDistance</th>
          <th class="download1">createdAt</th>
          <th class="download1">updatedAt</th>

        </tr>
        <tr v-for="row in formState.flightData " :key="row">
          <td class="download1">{{row.id}}</td>

          <td class="download1" >{{row.realmId}}</td>
          <td class="download1">{{row.flightDate}}</td>
          <td class="download1">{{row.flightNumber}}</td>
          <td class="download1">{{row.aircraftType}}</td>
          <td class="download1">{{row.aircraftRegistration}}</td>
          <td class="download1" >{{ row.airplanePointer ?   row.airplanePointer.id : " "}} </td>   //row.airplanePointer
          <td class="download1">{{row.from}}</td>
          <td class="download1">{{row.to}}</td>
          <td class="download1">{{row.outTime}}</td>
          <td class="download1">{{row.offTime}}</td>
          <td class="download1">{{row.onTime}}</td>
          <td class="download1">{{row.inTime}}</td>
          <td class="download1">{{row.nightTime}}</td>
          <td class="download1">{{row.pfTakeOff}}</td>
          <td class="download1">{{row.pfLanding}}</td>
          <td class="download1">{{row.picTime}}</td>
          <td class="download1">{{row.autoland}}</td>
          <td class="download1">{{row.goAround}}</td>
          <td class="download1">{{row.diverted}}</td>
          <td class="download1">{{row.blockTime}}</td>
          <td class="download1">{{row.flightTime}}</td>
          <td class="download1">{{row.crew2}}</td>
          <td class="download1">{{row.crew3}}</td>
          <td class="download1">{{row.crew4}}</td>
          <th class="download1">{{row.approachType}}</th>
          <th class="download1">{{row.totalPassangers}}</th>
          <th class="download1">{{row.totalPayload}}</th>
          <th class="download1">{{row.flightplanDistance}}</th>
          <th class="download1">{{row.createdAt}}</th>
          <th class="download1">{{row.updatedAt}}</th>

          
        </tr>
        <tr>
          
        </tr>

      </table>
    </div>
    <div style="display:none">
  
     
             <table id="tbl1" align="center">
               <thead>
                 <tr>
                 <th >
                     Pilot's LogBook
   
                 </th>
                 </tr>
                 
               </thead>
               <tbody>
                  <tr>
                   <td>
                   </td>
                 </tr>
                 <tr>
                   <td>
                     {{formState.name}}
                   </td>
                 </tr>
                 <tr>
                    <td>
                    {{ formState.date}}
                   </td>
                 </tr>
               </tbody>
               <tfoot>
                <tr>
         <td>Generated by Log ATP</td>
            </tr>
     </tfoot>
             </table>
   
             <table id="tbl4" border='1'>
               <thead >
                 <tr>
                   <th>#</th>
                   <th >Date</th>
                   <th >Aircraft</th>
                   <th >Registration</th>
                   <th >Flight #</th>
                   <th >From</th>
                  <th >To</th>
                   <th >Pilot in Command</th>
                   <th >Out</th>
                   <th >Off</th>
                   <th >On</th>
                    <th >In</th>
                   <th >Block Time</th>
                   <th >Night Time</th>
                   <th >Takeoff</th>
                   <th >Landing</th>
                 </tr>
               </thead>
               <tbody>
                 <tr v-for="(row,i) in formState.flightData" :key="i">
                   <td>{{i}}</td>
                   <td>{{row.flightDate}}</td>
                   <td>{{row.aircraftType}}</td>
                   <td>{{row.aircraftRegistration}}</td>
                   <td>{{row.flightNumber}}</td>
                   <td>{{row.from}}</td>
                   <td>{{row.to}}</td>
                   <td class="ellipsis"><span>{{row.pilotInCommand}}</span></td>
                   <td>{{row.outTime}}</td>
                   <td>{{row.offTime}}</td>
                   <td>{{row.onTime}}</td>
                   <td>{{row.inTime}}</td>
                   <td>{{row.blockTime}}</td>
                   <td>{{row.nightTime}}</td>
                   <td>{{row.pfTakeOff ? "1":""}}</td>
                   <td>{{row.pfLanding?"1":""}}</td>
                 </tr>
   
   

   
   
                
   
   
               </tbody>
             </table >
                 <table id="tbl2" class="table table-sm table-bordered text-center"
                           style="font-size: 12px; white-space: nowrap" cellpadding="5" border='1' width="100%">
                           <thead class="thead-light">
                               <tr>
                                   <th style="width: 5%" bgcolor="#E8E8E8">#</th>
                                   <th style="width: 15%" bgcolor="#E8E8E8">Start Date</th>
                                   <th style="width: 15%" bgcolor="#E8E8E8">End Date</th>
                                   <th style="width: 50%" bgcolor="#E8E8E8">Description</th>
                                   <th style="width: 15%" bgcolor="#E8E8E8">Hours</th>
                               </tr>
                           </thead>
                           <tbody>
                               <tr v-for="(row,i) in formState.experienceData" :key="i">
                                   <td>{{i}}</td>
                                   <td>{{row.startDate}}</td>
                                   <td>{{row.endDate}}</td>
                                   <td>{{row.name}}</td>
                                   <td>{{row.hours}}</td>
                               </tr>
   
   
                              
                           </tbody>
                       </table>
                          <table id="tbl3" class="table table-sm table-bordered text-center" style="font-size: 12px; white-space: nowrap"
                       cellpadding="5" border='1'>
                       <thead class="thead-light">
                           <tr>
                               <th colspan="2">Total</th>
   
                           </tr>
                       </thead>
                       <tbody>
                           <tr class="font-weight-bold">
                               <td>Total this page</td>
                               <td>0.00</td>
   
                           </tr>
                           <tr class="font-weight-bold">
                               <td>Grand Total</td>
                               <td>0.00</td>
   
                           </tr>
                       </tbody>
                   </table>
                 <table id="tbl5" class="table table-bordered" width="100%" style="font-size: 16px; white-space: nowrap"
                 cellpadding="5" border='1'>
                 <thead class="thead-light">
                   <tr>
                     <th scope="col" colspan="2" bgcolor="#E8E8E8">Hours</th>
   
                   </tr>
                 </thead>
                 <tbody>
                   <tr>
                     <td>Pilot in Command Hours</td>
                     <td class="text-center">{{formState.pilotinCommandHours}}</td>
                   </tr>
                   <tr>
                     <td>Total Hours Carried Forward</td>
                     <td class="text-center">{{formState.totalHoursCarriedForward}}</td>
                   </tr>
                   <tr>
                     <td>Total Hours <small>(Last 30 days)</small></td>
                     <td class="text-center">{{formState.last30daysHours}}</td>
                   </tr>
                   <tr>
                     <td>Total Hours <small>(Last 90 days)</small></td>
                     <td class="text-center">{{formState.last90daysHours}}</td>
                   </tr>
                   <tr>
                     <td>Total Hours <small>(Last 183 days)</small></td>
                     <td class="text-center">{{formState.last183daysHours}}</td>
                   </tr>
                   <tr>
                     <td>Total Hours <small>(Last 365 days)</small></td>
                     <td class="text-center">{{formState.last365daysHours}}</td>
                   </tr>
                 </tbody>
               </table>
               <table id="tbl6" class="table table-bordered" width="100%" style="font-size: 16px; white-space: nowrap"
                 cellpadding="5" border='1'>
                 <thead class="thead-light">
                   <tr>
                     <th scope="col" colspan="2" bgcolor="#E8E8E8">Statistics</th>
   
                   </tr>
                 </thead>
                 <tbody>
                   <tr>
                     <td>PIC Flights</td>
                     <td class="text-center">{{formState.picFlights}}</td>
                   </tr>
                   <tr>
                     <td>Total Takeoffs</td>
                     <td class="text-center">{{formState.totalLandings}}</td>
                   </tr>
                   <tr>
                     <td>Total Landings</td>
                     <td class="text-center">{{formState.totalLandings}}</td>
                   </tr>
                   <tr>
                     <td>Total Airports Visited</td>
                     <td class="text-center">{{formState.totalAirportsVisited}}</td>
                   </tr>
   
                 </tbody>
               </table>
                <table id="tbl7" class="table table-bordered" width="100%" style="font-size: 16px; white-space: nowrap"
                 cellpadding="5" border='1'>
                 <thead class="thead-light">
                   <tr>
                     <th scope="col" colspan="3" bgcolor="#E8E8E8">Aircraft Types</th>
   
                   </tr>
                   <tr>
                     <th>Type</th>
                     <th>Total Flights</th>
                     <th>Total Hours</th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr v-for="row in formState.AircraftTypes" :key="row">
                     <td>{{row.type}}</td>
                     <td>{{row.Flights}}</td>
                     <td>{{row.BlockTime}}</td>
                   </tr>
                 
   
   
                 </tbody>
               </table>
   <table id="tbl8">
     <thead>
       <tr>
          <th>
     {{formState.GrandTotal}}
        </th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td>
           Grand Total
         </td>
       </tr>
     </tbody>
     </table>
     <table id="tbl9">
     <thead>
       <tr>
         <th>
    {{formState.flights}}
    </th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td>
           Total Flights
         </td>
       </tr>
     </tbody>
     </table>
     <table id="tbl10">
     <thead>
       <tr>
          <th>
  {{formState.mostRecentFlight}}
    </th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td>
           
           Most Recent Flight
         </td>
       </tr>
     </tbody>
     </table>
     <table id="tbl11">
     <thead>
       <tr>
          <th>
     {{formState.mostRecentRoute}}
       </th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td>
           Most Recent Route
         </td>
       </tr>
     </tbody>
     </table>
     </div>
    <sdCards size="default">
    <!-- <a-spin :spinning="formState.loader" class size="large"> -->

      <!-- <sdButton size="default" transparented type="primary" @click="downloadPdf()" >
        <font-awesome-icon class="icon" icon="fa-solid fa-file" />
        <span>Log ATP Logbook</span>
      </sdButton>
      </a-spin> -->
      <a-button @click="downloadPdf" :loading="formState.loader">
        <font-awesome-icon class="icon" icon="fa-solid fa-file" />
        <span>All System Data</span>
      </a-button>
      <a-button   :loading="formState.flightLoader" @click="exportFlightCSV()">
        <font-awesome-icon class="icon" icon="fa-solid fa-file" />
        <span>Log ATP Data</span>
        </a-button>
    <a-button :loading="formState.crewLoader"  @click="exportCSV">
        <font-awesome-icon class="icon" icon="fa-solid fa-file" />
        <span>All System Data</span>
      </a-button>
    </sdCards>

    <!-- </Main> -->
  </div>
</template>
<script>
// import "bootstrap/dist/css/bootstrap.min.css";

import { defineComponent,onMounted ,reactive} from "vue";
import experience from "../../../server/experience";
// import { Main } from "../../styled";
import { saveAs } from 'file-saver';
import jsPDF from "jspdf";
 import autoTable from 'jspdf-autotable';
const doc =new jsPDF('l','mm','a3')
import pdf from '../../../server/pdf'
import crewsCSF from '../../../server/crewsCSV'
export default defineComponent({
  components: {
    // Main,
  
  },
  setup() {
    
   const  exportCSV =async()=> {
    formState.crewLoader=true
    await crewsCSF.getCrewsData().then(results=>{
    formState.crewsData=results.crews
    // console.log(results)
  })
    // console.log("Hi")
  let csv = [];
  const rows = document.querySelectorAll("table tr");

  for (const row of rows.values()) {
    const cells = row.querySelectorAll(".download");
    const rowText = Array.from(cells).map((cell) => cell.innerText);
    csv.push(rowText.join(","));
  }
  const csvFile = new Blob([csv.join("\n")], {
    type: "text/csv;charset=utf-8;"
  });

  formState.crewLoader=false

  saveAs(csvFile, "LogATP system data-crew");
}
const  exportFlightCSV =async()=> {
  formState.flightLoader=true
  await pdf.getPdfData().then(res=>{
  formState.name= res.name,
  formState.flightData=res.flightDetails
  // for(var row of res.flightDetails){
  //   if(row.airplanePointer)
  //   console.log(row.airplanePointer.id)
  // }
  // formState.GrandTotal=res.GrandTotal
  // formState.flights=res.flights
  // formState.mostRecentFlight=res.mostRecentFlight
  // formState.mostRecentRoute=res.mostRecentRoute
  // formState.totalTakeoffs=res.totalTakeoffs
  // formState.totalLandings=res.totalLandings
  // formState.totalAirportsVisited=res.totalAirportsVisited
  // formState.picFlights=res.picFlights
  
  // formState.pilotinCommandHours=res.pilotinCommandHours
  // formState.totalHoursCarriedForward=res.totalHoursCarriedForward
  // formState.last30daysHours=res.last30daysHours
  // formState.last90daysHours=res.last90daysHours
  // formState.last183daysHours=res.last183daysHours
  // formState.last365daysHours=res.last365daysHours
// formState.AircraftTypes= res.AircraftTypes
formState.date= res.date
formState.crewLoader=false

  
 
})
 
//  await experience.getExperiences().then(res=>{
//   console.log(res)
//   for(const exp of res){
//     const startDate= exp.get("startDate")
//     const name= exp.get("name")

//     const endDate= exp.get("endDate")
//     const description= exp.get("note")
//     const hours= exp.get("totalMinutes")
//     // formState.totalHoursCarriedForward+=hours
//     formState.experienceData.push({
//       startDate:startDate,
//       endDate:endDate,
//       description:description,
//       hours:hours,
//       name:name,
//     })
//     // console.log(formState.experienceData)


    
//   }
// })

// for(const obj of formState.experienceData){
//   formState.totalHoursCarriedForward += obj.hours
// }


  
    // console.log("Hi")
  let csv = [];
  const rows = document.querySelectorAll("table tr");

  for (const row of rows.values()) {
    const cells = row.querySelectorAll(".download1");
    const rowText = Array.from(cells).map((cell) => cell.innerText);
    csv.push(rowText.join(","));
  }
  const csvFile = new Blob([csv.join("\n")], {
    type: "text/csv;charset=utf-8;"
  });
formState.flightLoader=false

  saveAs(csvFile, "LogATP system data-flight");
}

const downloadPdf = async()=>{
  formState.loader = true;

  // await crewsCSF.getCrewsData().then(results=>{
  //   formState.crewsData=results.crews
  //   console.log(results)
  // })
  await pdf.getPdfData().then(res=>{
  formState.name= res.name,
  formState.username=res.username
  formState.fname=res.fname
  formState.lname=res.lname
  formState.flightData=res.flightDetails
  // for(var row of res.flightDetails){
  //   if(row.airplanePointer)
  //   console.log(row.airplanePointer.id)
  // }
  formState.GrandTotal=res.GrandTotal
  formState.flights=res.flights
  formState.mostRecentFlight=res.mostRecentFlight
  formState.mostRecentRoute=res.mostRecentRoute
  formState.totalTakeoffs=res.totalTakeoffs
  formState.totalLandings=res.totalLandings
  formState.totalAirportsVisited=res.totalAirportsVisited
  formState.picFlights=res.picFlights
  
  formState.pilotinCommandHours=res.pilotinCommandHours
  // formState.totalHoursCarriedForward=res.totalHoursCarriedForward
  formState.last30daysHours=res.last30daysHours
  formState.last90daysHours=res.last90daysHours
  formState.last183daysHours=res.last183daysHours
  formState.last365daysHours=res.last365daysHours
formState.AircraftTypes= res.AircraftTypes
formState.date= res.date
formState.crewLoader=false

  
 
})
 
 await experience.getExperiences().then(res=>{
  // console.log(res)
  for(const exp of res){
    const startDate= exp.get("startDate")
    const name= exp.get("name")

    const endDate= exp.get("endDate")
    const description= exp.get("note")
    const hours= exp.get("totalMinutes")
    // formState.totalHoursCarriedForward+=hours
    formState.experienceData.push({
      startDate:startDate,
      endDate:endDate,
      description:description,
      hours:hours,
      name:name,
    })
    // console.log(formState.experienceData)


    
  }
})

for(const obj of formState.experienceData){
  formState.totalHoursCarriedForward += obj.hours
}
formState.loader = false;


// console.log(formState.totalHoursCarriedForward)
// var name=formState.username;
// var lastname=formState.lnam
doc.setFontSize(56)
doc.setDrawColor('black');
doc.text(" Pilot's Logbook", 150, 120);
doc.setFontSize(18)
doc.text(formState.name, 170, 240);
doc.text(formState.date, 170, 250);
doc.setTextColor('#A0A0A0');
doc.setFontSize(28)
doc.text('Generated by Log ATP', 170, 270);
  // console.log("autotable",autoTable);
doc.addPage();
doc.setFontSize(56)
doc.setTextColor('black');
doc.setDrawColor('black');
doc.text('Summary', 20, 30);
doc.setLineWidth(1);
doc.line(15, 50, 400, 50);
var startingPage = doc.internal.getCurrentPageInfo().pageNumber;
    autoTable(doc, { html: '#tbl8',
    headStyles: {cellWidth:90,halign:'center', minCellHeight:25,valign:'center', fontSize:24,fillColor: 'white',textColor:'black', lineWidth:{top:0.3,left:0.3,bottom:0,right:0.3},lineColor:'black' },
    bodyStyles:{cellWidth:90, halign:'center', minCellHeight:25,valign:'center', lineWidth:{top:0,left:0.3,bottom:0.3,right:0.3},textColor:'black',fontSize:18 ,lineColor:'black'  },
    margin: { top:30,right:5,left:12 },
    startY:80
     })
    doc.setPage(startingPage);
    autoTable(doc, { html: '#tbl9',
    headStyles: {cellWidth:90,minCellHeight:25,halign:'center',valign:'center', fontSize:24,fillColor: 'white',textColor:'black',  lineWidth:{top:0.3,left:0.3,bottom:0,right:0.3},lineColor:'black' },
    bodyStyles:{cellWidth:90,minCellHeight:25, halign:'center',fontSize:18,valign:'center' ,lineColor:'black',textColor:'black', lineWidth:{top:0,left:0.3,bottom:0.3,right:0.3},  },
    margin: { top:0,right:5,left:112 },
    startY:80
     })
    doc.setPage(startingPage);
    autoTable(doc, { html: '#tbl10',
    headStyles: {cellWidth:90,minCellHeight:25,halign:'center',valign:'center', fontSize:24,fillColor: 'white',textColor:'black', lineColor:'black' , lineWidth:{top:0.3,left:0.3,bottom:0,right:0.3},},
    bodyStyles:{cellWidth:90,minCellHeight:25, halign:'center', fontSize:18,valign:'center' ,lineColor:'black' ,textColor:'black', lineWidth:{top:0,left:0.3,bottom:0.3,right:0.3}, },
    margin: { top:0,right:5,left:212 },
    startY:80
     })
    doc.setPage(startingPage);
    autoTable(doc, { html: '#tbl11',
    headStyles: {cellWidth:90,minCellHeight:25,halign:'center',valign:'center', fontSize:24,fillColor: 'white',textColor:'black', lineWidth:{top:0.3,left:0.3,bottom:0,right:0.3},lineColor:'black' },
    bodyStyles:{cellWidth:90,minCellHeight:25, halign:'center', fontSize:18,valign:'center' ,lineColor:'black'  ,textColor:'black', lineWidth:{top:0,left:0.3,bottom:0.3,right:0.3},},
    margin: { top:0,right:5,left:312},
    startY:80
     })
    doc.setPage(startingPage);
    autoTable(doc, { html: '#tbl5',
    headStyles: {cellWidth:70,halign:'center',valign:'top', fontSize:14,fillColor: 'white',textColor:'black', lineWidth:0.3,lineColor:'black' },
    bodyStyles:{cellWidth:70, halign:'center',textColor:'black', lineWidth:0.3,fontSize:14,valign:'top' ,lineColor:'black'  },
    margin: { top:140 ,right:5,left:5 },
    startY:140,
     })
    doc.setPage(startingPage);
    autoTable(doc, { html: '#tbl6',
    headStyles: { cellWidth:50,halign:'center', fontSize:14,valign:'top',fillColor: 'white',textColor:'black', lineWidth:0.3,lineColor:'black' },
    bodyStyles:{ cellWidth:50,lineWidth:0.3,textColor:'black',halign:'center',valign:'top',fontSize:14,lineColor:'black'  },
    margin: { left: 153,top:0 },
    startY:140
     })
    doc.setPage(startingPage);
    autoTable(doc, { html: '#tbl7',
    headStyles: { cellWidth:50,halign:'center', fontSize:14,valign:'top',fillColor: 'white',textColor:'black', lineWidth:0.3,lineColor:'black' },
    bodyStyles:{ cellWidth:50,lineWidth:0.3,halign:'center',textColor:'black',valign:'top',fontSize:14,lineColor:'black'  },
    margin: { left: 260,top:0 },
    startY:140
     })
    doc.addPage();
    doc.setFontSize(40)
    doc.setDrawColor('black');
    doc.text('Total Hours Carried Forward', 20, 30);
    doc.setLineWidth(1);
    doc.line(15, 50, 400, 50);
     autoTable(doc, { html: '#tbl2',
    headStyles: { halign:'center',fontSize:14,fillColor: 'white',textColor:'black', lineWidth:0.3,lineColor:'black' },
    bodyStyles:{ lineWidth:0.3,fontSize:14,lineColor:'black',textColor:'black' ,halign:'center' },
    startY:70
     })
    autoTable(doc, { html: '#tbl3',
    headStyles: { halign:'center', cellWidth:50 , fontSize:10 ,fillColor: 'white',textColor:'black', lineWidth:0.3,lineColor:'black' },
    bodyStyles:{ cellWidth:50 ,fontSize:10,lineWidth:0.3,lineColor:'black',textColor:'black', halign:'center' },
    margin:{left:290,right:50}
     })
    doc.addPage();
    autoTable(doc, { html: '#tbl4',
    headStyles: { halign:'center', fillColor: 'white',textColor:'black', lineWidth:0.3,lineColor:'black' },
    bodyStyles:{ lineWidth:0.3,lineColor:'black' ,textColor:'black',halign:'center' },
     })
     doc.save('LogATP-'+formState.fname+'-Logbook.pdf')


}
const formState = reactive({
  name:"",
  date:"",
  fname:'',
  lname:"",
  flightData:[],
  GrandTotal:0,
            flights:0,
            mostRecentFlight:'',
            mostRecentRoute:"",
            picFlights:0,
            totalTakeoffs:0,
            totalLandings:0,
            totalAirportsVisited:0,
            pilotinCommandHours:0,
            totalHoursCarriedForward:0,
            last30daysHours:0,
            last90daysHours:0,
            last183daysHours:0,
            last365daysHours:0,
            AircraftTypes:[],
            crewsData:[],
            experienceData:[],
            crewLoader:false,
            loader:false,
            flightLoader:false,
            username:''
            
            
})
onMounted(async()=>{
  
  


//   await crewsCSF.getCrewsData().then(results=>{
//     formState.crewsData=results.crews
//     console.log(results)
//   })
//   await pdf.getPdfData().then(res=>{console.log("res",res)
//   formState.name= res.name,
//   formState.flightData=res.flightDetails
//   // for(var row of res.flightDetails){
//   //   if(row.airplanePointer)
//   //   console.log(row.airplanePointer.id)
//   // }
//   formState.GrandTotal=res.GrandTotal
//   formState.flights=res.flights
//   formState.mostRecentFlight=res.mostRecentFlight
//   formState.mostRecentRoute=res.mostRecentRoute
//   formState.totalTakeoffs=res.totalTakeoffs
//   formState.totalLandings=res.totalLandings
//   formState.totalAirportsVisited=res.totalAirportsVisited
//   formState.picFlights=res.picFlights
  
//   formState.pilotinCommandHours=res.pilotinCommandHours
//   // formState.totalHoursCarriedForward=res.totalHoursCarriedForward
//   formState.last30daysHours=res.last30daysHours
//   formState.last90daysHours=res.last90daysHours
//   formState.last183daysHours=res.last183daysHours
//   formState.last365daysHours=res.last365daysHours
// formState.AircraftTypes= res.AircraftTypes
// formState.date= res.date
// formState.crewLoader=false

  
 
// })
 
//  await experience.getExperiences().then(res=>{
//   console.log(res)
//   for(const exp of res){
//     const startDate= exp.get("startDate")
//     const name= exp.get("name")

//     const endDate= exp.get("endDate")
//     const description= exp.get("note")
//     const hours= exp.get("totalMinutes")
//     // formState.totalHoursCarriedForward+=hours
//     formState.experienceData.push({
//       startDate:startDate,
//       endDate:endDate,
//       description:description,
//       hours:hours,
//       name:name,
//     })
//     // console.log(formState.experienceData)


    
//   }
// })

// for(const obj of formState.experienceData){
//   formState.totalHoursCarriedForward += obj.hours
// }

// console.log(formState.totalHoursCarriedForward)




})





  
    return {
  
      exportCSV,
      downloadPdf,
      formState,
      exportFlightCSV
   
    };
  }
});
</script>
<style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  </style>