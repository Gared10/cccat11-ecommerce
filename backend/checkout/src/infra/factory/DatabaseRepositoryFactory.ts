import CouponRepositoryDatabase from "../repository/CouponRepositoryDatabase";
import DatabaseConnection from "../database/DatabaseConnection";
import LocationRepositoryDatabase from "../repository/LocationRepositoryDatabase";
import OrderRepositoryDatabase from "../repository/OrderRepositoryDatabase";
import ProductRepositoryDatabase from "../repository/ProductRepositoryDatabase";
import RepositoryFactory from "../../application/factory/RepositoryFactory";
import OrderRepository from "../../application/repository/OrderRepository";
import ProductRepository from "../../application/repository/ProductRepository";
import CouponRepository from "../../application/repository/CouponRespository";
import LocationRepository from "../../application/repository/LocationRepository";

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