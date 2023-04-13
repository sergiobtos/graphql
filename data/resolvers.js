import { Widgets } from './dbConnectors';

  
const resolvers = {
    getProduct: async ({id}) => {
      const product = await Widgets.findOne({ _id: id });

      return product
    },
    getAllProducts: async () => {
      const products = await Widgets.find();
      return products;
    },
    createProduct: ({input}) => {
        const newWidget = new Widgets({
          name: input.name,
          description: input.description,
          price: input.price,
          soldout: input.soldout,
          inventory: input.inventory,
          stores: input.stores,
        });
        newWidget.id = newWidget._id;
        return new Promise((resolve, reject) => {
          newWidget.save((err) => {
            if (err) reject(err);
            else resolve(newWidget);
          });
        });
    },
    updateProduct: ({input}) => {
      return new Promise((resolve, reject) => {
        Widgets.findOneAndUpdate({ _id: input.id }, input, { new: true }, (err, widget) => {
          if (err) reject(err);
          else resolve(widget);
        });
      });
    },
    deleteProduct: ({id}) => {
      return new Promise((resolve, reject) => {
        Widgets.findOneAndDelete({ _id: id }, (err) => {
          if (err) reject(err);
          else resolve('Successfully deleted widget');
        });
      });
    }
  };

  export default resolvers;