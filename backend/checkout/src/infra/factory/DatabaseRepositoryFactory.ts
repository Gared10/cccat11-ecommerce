import CouponRepositoryDatabase from "../repository/CouponRepositoryDatabase";
import CouponRepository from "../../application/usecase/interface/CouponRespository";
import DatabaseConnection from "../database/DatabaseConnection";
import LocationRepository from "../../application/usecase/interface/LocationRepository";
import LocationRepositoryDatabase from "../repository/LocationRepositoryDatabase";
import OrderRepository from "../../application/usecase/interface/OrderRepository";
import OrderRepositoryDatabase from "../repository/OrderRepositoryDatabase";
import ProductRepository from "../../application/usecase/interface/ProductRepository";
import ProductRepositoryDatabase from "../repository/ProductRepositoryDatabase";
import RepositoryFactory from "../../application/usecase/interface/RepositoryFactory";

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