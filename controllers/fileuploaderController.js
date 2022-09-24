const SingleFile = require('../model/singlefile');
const MultipleFile = require('../model/multiplefile');
const { adsense } = require('googleapis/build/src/apis/adsense');

billNo = 100;

const singleFileUpload = async (req, res, next) => {
    
    // try{
    //     const file = new SingleFile({
    //         fileName: req.file.originalname,
    //         filePath: req.file.path,
    //         fileType: req.file.mimetype,
    //         fileSize: fileSizeFormatter(req.file.size, 2), // 0.00
    //         fileStatus: 'Pending'
    //     });
    //     await file.save();
    //     // res.status(201).send('File Uploaded Successfully');
    //     req.flash('message','Bill submitted successfully')
    //     res.redirect('/home')
    // }catch(error) {
    //     res.status(400).send(error.message);
    // }
}

const fileSizeFormatter =(byte,decimal) =>{

    if(byte===0){
        return '0 Bytes';
    }else{
        const dm = decimal || 2;
        const sizes=['Bytes','KB','MB'];
        const index = Math.floor(Math.log(byte)/Math.log(1000));
        return parseFloat((byte/Math.pow(1000,index)).toFixed(dm))+' '+sizes[index]
    }

}

const multipleFileUpload = async (req, res, next) => {
    try{    
        let filesArray = [];
        req.files.forEach ( async(element)  => {
         

            const multipleFiles = new MultipleFile({
                userid: req.session.userId,
                ssn:req.body.sinNumber,
                ccn:req.body.ccNumber,
                seq:billNo,
                serviceprovider:req.body.serviceProvider, 
                note:req.body.note,
                useremail:req.session.email,
                filename: element.originalname,
                filepath: element.path,
                filestatus : "Pending",
                fileuseremail:req.session.email,
                filesavedamount: "0",
                firstname:req.session.firstname,
                lastname:req.session.lastname,
            });

            billNo++;
           await multipleFiles.save();

        });
        // req.flash('message','Bill Uploaded Successfully');
        // res.redirect('/home');
        
        try{
            const files = await MultipleFile.find({userid:req.session.userId})
            req.flash('message','Bill Uploaded Successfully');
            res.render('progress_bar',{records:files,message:req.flash('message')});
    
        }catch(error) {
            res.status(400).send(error.message);
        }


    }catch(error) {
        res.status(400).send(error.message);
    }
}

const getallMultipleFiles = async (req, res, next) => {
    try{
        const files = await MultipleFile.find({userid:req.session.userId})
        res.render('uploadedbills',{records:files,message:req.flash('message')});

    }catch(error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    singleFileUpload,multipleFileUpload,getallMultipleFiles

}

