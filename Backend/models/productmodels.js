const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter product name'],
    },
    discription:{
        type:String,
        required:[true,'please enter product discription'],
    },
    price:{
        type:Number,
        required:[true,'please enter product price'],
        MaxLength:[8,'product price cannot exceed 8 characters'],
    },
    rating:{
        type:Number,
        default:0,
    },
    images:[
        {
            public_id:{
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true,
            }
        }   
    
    ],
    category:{
        type:String,
        required:[true,'please select category for this product'],
    },
    stock:{
        type:Number,
        required:[false,'please enter product stock'],
        MaxLength:[4,'product stock cannot exceed 4 characters'],
        default:1,
        
    },
    numOfReviews:{
        type:Number,
        default:0,
    },
    reviews:[
    {
        name:{
            type:String,
            required:true,
        },
        rating:{
            type:Number,
            required:true,
        },
        comment:{
            type:String,
            required:true,
    }
    }
],
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

module.exports=mongoose.model('Product',productSchema);



