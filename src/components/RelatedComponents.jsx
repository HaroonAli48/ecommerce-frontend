import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedComponents = ({ category, subCategory }) => {
    const [related, setRelated] = useState([]);
    const { products } = useContext(ShopContext);

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();

            productsCopy = productsCopy.filter((item) => category === item.category);
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);

            setRelated(productsCopy.slice(0, 5));
        }
    }, [products, category, subCategory]);

    return (
        <div className='my-24' onClick={()=>window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="text-3xl text-center py-2">
                <Title text1={"RELATED"} text2={"PRODUCTS"} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {
                    related.map((item, index) => (
                        <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} stock={item.stock}/>
                    ))
                }
            </div>
        </div>
    );
}

export default RelatedComponents;
