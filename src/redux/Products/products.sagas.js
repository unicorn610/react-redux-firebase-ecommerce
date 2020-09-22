import { auth } from './../../firebase/utils';
import { takeLatest, put, all, call } from 'redux-saga/effects';
import { setProducts, fetchProductsStart } from './products.actions';
import {
  handleAddProduct,
  handleDeleteProduct,
  handleFetchProducts,
} from './products.helpers';
import productsTypes from './products.types';

export function* addProduct({
  payload: { productCategory, productName, productThumbnail, productPrice },
}) {
  try {
    const timestamp = new Date();
    yield handleAddProduct({
      productCategory,
      productName,
      productThumbnail,
      productPrice,
      productAdminUserUID: auth.currentUser.uid,
      createDate: timestamp,
    });
  } catch (err) {
    console.log(err);
  }
}

export function* onAddProductStart() {
  yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct);
}

export function* fetchProducts() {
  try {
    const products = yield handleFetchProducts();
    yield put(setProducts(products));

    yield put(fetchProductsStart());
  } catch (err) {
    // console.log(err)
  }
}

export function* onFetchProductStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts);
}

export function* deleteProduct({ payload }) {
  try {
    yield handleDeleteProduct(payload);
    yield put(fetchProductsStart());
  } catch (err) {
    // console.log(err)
  }
}

export function* onDeleteProductStart() {
  yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct);
}

export default function* productSagas() {
  yield all([
    call(onAddProductStart),
    call(onFetchProductStart),
    call(onDeleteProductStart),
  ]);
}