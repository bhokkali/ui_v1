import React from 'react'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const styles = theme => ({
    button: {
        margin: 5,
        padding: 5
    }
  });

export class GeneratePDF extends React.Component {
    
      
    generatePDF = () => {
        const { authInfo, gradeName, content, tableData } = this.props
        var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "portrait" });
        //var doc = new jsPDF('p', 'mm', 'a4', true);
        //Header Start
        doc.setDrawColor(0);
        doc.setFillColor(235, 235, 235);
        doc.rect(5, 5, 200, 37, 'FD');
        doc.setFont("times");
        doc.setFontStyle("normal");
        doc.text(authInfo.school_name, 105, 12, null, null, "center")
        doc.text(authInfo.academic_year, 105, 20, null, null, "center")
        doc.setFont("courier");
        doc.setFontStyle("normal");
        doc.text('Grade', 10, 28)
        doc.text(':', 35, 28)
        doc.text(gradeName, 40, 28)
        doc.text('Content', 10, 36)
        doc.text(':', 35, 36)
        doc.text(content, 40, 36)
        //Header Ends
        
        let posY = 51

        console.log('tableData >> ')
        console.log(tableData)
      

        tableData.map((opt, key) => {
            
            posY = key === 0 ? posY : parseInt(posY)+100
            console.log('posY')
            console.log(posY)
            doc.autoTable({
                head: opt.columDef,
                body: opt.rowDef,
                startY: posY,
                margin: {horizontal:5,top: 20},
                styles: {
                    cellPaddingLeft: 5,
                    rowHeight: 10,
                    fillStyle: 'S',
                    halign: 'left',
                    valign: 'middle',
                    //fontStyle: 'bold',
                    lineWidth: 0.01,
                    fontSize: 10,
                    textColor: 0,
                },
                headerStyles: {
                    //columnWidth: 'wrap',
                    textColor: '#FFF',
                    
                },
            });
        })
        

        /*doc.autoTable({
            head: [],
            body: periodsRow,
            startY: 151,
            margin: {horizontal:5,top: 20},
            styles: {
                cellPaddingLeft: 10,
                rowHeight: 10,
                fillStyle: 'S',
                halign: 'left',
                valign: 'middle',
                //fontStyle: 'bold',
                lineWidth: 0.01,
                fontSize: 10,
                textColor: 0,
            },
        }); */

        window.open(doc.output('bloburl'))
        //doc.save("test.pdf")
    }
    
    render () {
        const { classes } = this.props
        return (
            <React.Fragment>
                <Button
                        variant="contained"
                        color="primary"
                        onClick={this.generatePDF}
                        className={classes.button}
                        disabled={false}
                    >
                        Generate PDF
                    </Button>
            </React.Fragment>
            
        )
    }
}


export default withStyles(styles)(GeneratePDF)
