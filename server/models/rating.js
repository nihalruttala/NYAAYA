const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema({
  cnrNumber: { type: String, required: true},
  rate: { type: Number, required: true },
  email: { type: String, required: true},  
  
}, { collection: 'rating2' });

// Add the static method to calculate average rating
rateSchema.statics.calculateAverageRating = async function(email) {
  const result = await this.aggregate([
    {
      $match: { email }
    },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rate" }
      }
    }
  ]);
  
  return result.length > 0 ? result[0].averageRating : 0;
};

const rating = mongoose.model('rating', rateSchema);

module.exports = rating;
