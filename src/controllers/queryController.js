import Query from "../models/Query.js";

export const getAllQueries = async (req, res) => {
    try {
        const queries = await Query.find().sort({ createdAt: -1 });
        res.status(200).json(queries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createQuery = async (req, res) => {
    try {
        const newQuery = new Query(req.body);
        await newQuery.save();
        res.status(201).json(newQuery);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateQueryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedQuery = await Query.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        res.status(200).json(updatedQuery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
