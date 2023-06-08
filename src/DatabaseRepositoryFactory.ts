import CouponRepositoryDatabase from "./CouponRepositoryDatabase";
import CouponRepository from "./CouponRespository";
import DatabaseConnection from "./DatabaseConnection";
import LocationRepository from "./LocationRepository";
import LocationRepositoryDatabase from "./LocationRepositoryDatabase";
import OrderRepository from "./OrderRepository";
import OrderRepositoryDatabase from "./OrderRepositoryDatabase";
import ProductRepository from "./ProductRepository";
import ProductRepositoryDatabase from "./ProductRepositoryDatabase";
import RepositoryFactory from "./RepositoryFactory";

export default class DatabaseRepositoryFactory implements RepositoryFactory {
  constructor(readonly connection: DatabaseConnection) {
  }

  createOrderRepository(): OrderRepository {
    return new OrderRepositoryDatabase(this.createProductRepository(), this.createLocationRepository(), this.connection);
  }
  createProductRepository(): ProductRepository {
    return new ProductRepositoryDatabase(this.connection);
  }
  createCouponRepository(): CouponRepository {
    return new CouponRepositoryDatabase(this.connection);
  }
  createLocationRepository(): LocationRepository {
    return new LocationRepositoryDatabase(this.connection);
  }

}