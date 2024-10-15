const Book = require('../models/books.model');
const User = require('../models/user.model');


const getAllBooks = async (req, res) => {
    console.log("njmjjj")
    try {
        const books = await Book.find({});
        res.status(200).json({ status: "Success" , data: books });
    } catch (error) {
        console.error("Error getting books:", error.message);
        res.status(500).json({  status: "Erorr" , message: "Server error" });
    }
};

const getBookById = async (req, res) => {
    try {
        const { bookId } = req.params; 
        

        const book = await Book.findOne({ bookId });

        if (!book) {
            return res.status(404).json({  status: "Erorr" , message: "Book not found" });
        }

        res.status(200).json({status: "Success" , data: book}); 
    } catch (error) {
        console.error("Error getting the book:", error.message);
        res.status(500).json({ status: "Erorr" , message: "Server error" });
    }
};

const addToWishlist = async (req, res) => {
    try {
        const userId = req.user.id; 
        const { bookId } = req.body; 
        
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ status: "Error" , message: "User not found" });
        }

        if (!user.wishlist) {
            user.wishlist = [];
        }

        if (user.wishlist.includes(bookId)) {
            return res.status(400).json({ status: "Error" ,message: "Book is already in the wishlist" });
        }

        user.wishlist.push(bookId);
        await user.save();

        return res.status(200).json({ status: "Success" , message: "Book added to wishlist successfully", wishlist: user.wishlist });
    } catch (error) {
        console.error("Error adding to wishlist:", error.message);
        return res.status(500).json({ status: "Error" , message: "Server error" });
    }
};
const getWishlist = async (req, res) => {
    try {
        const userId = req.user._id; 
        const user = await User.findById(userId).populate('wishlist'); 

        if (!user) {
            return res.status(404).json({ status: "Error" , message: "User not found" });
        }

        res.status(200).json({ status: "Success" , data: user.wishlist });
    } catch (error) {
        console.error("Error getting the wishlist:", error.message);
        res.status(500).json({ status: "Error" , message: "Server error" });
    }
};

const deleteFromWishlist = async (req, res) => {
    try {
        const userId = req.user.id; 
        const { bookId } = req.body; 

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ status: "Error" , message: "User not found" });
        }

        const index = user.wishlist.indexOf(bookId);
        if (index === -1) {
            return res.status(400).json({ status: "Error" , message: "Book not found in wishlist" });
        }

        user.wishlist.splice(index, 1);
        await user.save();

        return res.status(200).json({ status: "Success" , message: "Book removed from wishlist successfully", wishlist: user.wishlist });
    } catch (error) {
        console.error("Error removing from wishlist:", error.message);
        return res.status(500).json({ status: "Error" , message: "Server error" });
    }
};

const addToPurchasedList = async (req, res) => {
    try {
        const userId = req.user.id; 
        const { bookId } = req.body; 

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ status: "Error" , message: "User not found" });
        }

        if (user.purchasedList.includes(bookId)) {
            return res.status(400).json({ status: "Error" , message: "Book already purchased" });
        }

        user.purchasedList.push(bookId);
        await user.save(); 
        return res.status(200).json({ status: "Success" , message: "Book added to purchased list successfully", purchasedList: user.purchasedList });
    } catch (error) {
        console.error("Error adding to purchased list:", error.message);
        return res.status(500).json({ status: "Error" , message: "Server error" });
    }
};

const getPurchasedList = async (req, res) => {
    try {
        const userId = req.user.id; 

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ status: "Error" , message: "User not found" });
        }

        return res.status(200).json({ status: "Success" , purchasedList: user.purchasedList });
    } catch (error) {
        console.error("Error getting purchased list:", error.message);
        return res.status(500).json({ status: "Error" , message: "Server error" });
    }
};



module.exports = {
    getAllBooks,
    getBookById,
    addToWishlist,
    getWishlist,
    addToPurchasedList,
    getPurchasedList,
    deleteFromWishlist
};
