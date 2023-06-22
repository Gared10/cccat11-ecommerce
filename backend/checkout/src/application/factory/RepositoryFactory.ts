import CouponRepository from "../repository/CouponRespository";
import LocationRepository from "../repository/LocationRepository";
import OrderRepository from "../repository/OrderRepository";
import ProductRepository from "../repository/ProductRepository";

export default interface RepositoryFactory {
  createOrderRepository(): OrderRepository;
  createProductRepository(): ProductRepository;
  createCouponRepository(): CouponRepository;
  createLocationRepository(): LocationRepository;
}