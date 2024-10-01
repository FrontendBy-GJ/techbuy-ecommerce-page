import product from '../data/product.json';
import useCartContext from '../hooks/useCartContext';
import useCartModalContext from '../hooks/useCartModalContext';
import { formatToUSDCurrency } from '../utils/formatCurrency';
import { avgRating } from '../utils/calculateAvgRating';
import { RelatedProduct, Review, Specifications } from '../types/cartTypes';
import { calculateDaysAgo } from '../utils/calculateDaysAgo';

export default function ProductPage() {
  const { dispatch, state } = useCartContext();
  const { setIsCartModalOpen } = useCartModalContext();

  const {
    id,
    image,
    name,
    price,
    brand,
    reviews,
    description,
    specifications,
    related_products,
  } = product;

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id,
        name,
        price,
      },
    });
    setIsCartModalOpen(true);
  };

  return (
    <section>
      <div>
        <div>
          <figure>
            <img src={image} alt={name} />
          </figure>
        </div>

        <div>
          <a href="#">{brand}</a>
          <h1>{name}</h1>
          <a href="#reviews">
            &#9733; {avgRating(reviews)} <span>({reviews.length} reviews)</span>
          </a>
          <p>{formatToUSDCurrency(price)}</p>
          {state.items[0]?.id === id ? (
            <button onClick={() => setIsCartModalOpen(true)}>
              Added to cart
            </button>
          ) : (
            <button onClick={() => handleAddToCart()}>Add to cart</button>
          )}
        </div>
      </div>
      <h2>About this item</h2>
      <About description={description} specifications={specifications} />
      <h2>Related products</h2>
      <RelatedProducts related={related_products} />
      <h2>Guest ratings &amp; reviews</h2>
      <Reviews reviews={reviews} />
    </section>
  );
}

const About = ({
  description,
  specifications,
}: {
  description: string;
  specifications: Specifications;
}) => {
  return (
    <>
      <details>
        <summary>Details</summary>
        <div>
          <h3>Description</h3>
          <p>{description}</p>
        </div>
      </details>
      <details>
        <summary>Specifications</summary>
        <ul>
          {Object.entries(specifications).map(([key, value]) => (
            <li key={key}>
              <b>{key}</b>: {value}
            </li>
          ))}
        </ul>
      </details>
    </>
  );
};

const RelatedProducts = ({ related }: { related: RelatedProduct[] }) => {
  return (
    <>
      {Object.values(related).map(({ id, image, name, price }) => (
        <article key={id} className="related-prod-card">
          <figure>
            <img src={image} alt={name} />
          </figure>
          <div>
            <span>{formatToUSDCurrency(price)}</span>
            <h3>{name}</h3>
          </div>
        </article>
      ))}
    </>
  );
};

const Reviews = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div id="reviews">
      {reviews.map(({ id, author, rating, text, timestamp }) => {
        const daysAgo = calculateDaysAgo(timestamp);
        return (
          <div key={id}>
            <div>
              <div>
                <h4>{author}</h4> -{' '}
                <time dateTime={timestamp}>
                  {daysAgo} {daysAgo === 1 ? 'day' : 'days'} ago
                </time>
              </div>
              <span>&#9733; {rating}</span>
            </div>
            <p>{text}</p>
          </div>
        );
      })}
    </div>
  );
};
