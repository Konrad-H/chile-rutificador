const dfd = require("danfojs-node")

dfd.read_csv("./don_sii_agg_2019.csv") //assumes file is in CWD
  .then(df => {
  
   df.head().print()

  }).catch(err=>{
     console.log(err);
  })
// // let df = new dfd.read_csv('don_sii_agg_2019.csv');
// // df.print();

// dfd.read_csv("https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv")
// .then(df => {

//     var layout = {
//         title: 'A financial charts',
//         xaxis: {
//             title: 'Date',
//         },
//         yaxis: {
//             title: 'Count',
//         }
//     }

//     new_df = df.set_index({ key: "Date" })
//     new_df.plot("plot_div").line({ columns: ["AAPL.Open", "AAPL.High"], layout: layout })

// }).catch(err => {
//     console.log(err);
// })