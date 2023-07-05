import CouponRepository from "../repository/CouponRespository";
import OrderRepository from "../repository/OrderRepository";
import ProductRepository from "../repository/ProductRepository";

export default interface RepositoryFactory {
  createOrderRepository(): OrderRepository;
  createProductRepository(): ProductRepository;
  createCouponRepository(): CouponRepository;
}