import product from '../data/product.json';
import useCartContext from '../hooks/useCartContext';
import useCartModalContext from '../hooks/useCartModalContext';
import { formatToUSDCurrency } from '../utils/formatCurrency';
import { avgRating } from '../utils/calculateAvgRating';
import { RelatedProduct, Review, Specifications } from '../types/cartTypes';
import { calculateDaysAgo } from '../utils/calculateDaysAgo';
import { CSSProperties, MouseEvent, useRef } from 'react';

export default function ProductPage() {
  const { dispatch, state } = useCartContext();
  const { setIsCartModalOpen } = useCartModalContext();
  const imgRef = useRef<HTMLElement>(null);

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

  const handleOnMouseMove = (e: MouseEvent<HTMLElement>) => {
    imgRef.current?.style.setProperty('--display', 'block');
    let pointer = {
      x: (e.nativeEvent.offsetX * 100) / imgRef.current?.offsetWidth!,
      y: (e.nativeEvent.offsetY * 100) / imgRef.current?.offsetHeight!,
    };
    imgRef.current?.style.setProperty('--zoom-x', pointer.x + '%');
    imgRef.current?.style.setProperty('--zoom-y', pointer.y + '%');
  };

  const handleOnMouseOut = () => {
    imgRef.current?.style.setProperty('--display', 'none');
  };

  return (
    <section id="product-page">
      <div className="product">
        <figure
          ref={imgRef}
          style={
            {
              '--img': `url(${image})`,
              '--zoom-x': '0%',
              '--zoom-y': '0%',
              '--display': 'none',
            } as CSSProperties
          }
          onMouseMove={handleOnMouseMove}
          onMouseOut={handleOnMouseOut}
        >
          <img src={image} alt={name} />
        </figure>

        <div className="product-info">
          <span role="link" className="brand">
            {brand}
          </span>
          <div className="name-price">
            <div>
              <h1>{name}</h1>
              <div className="rating">
                <a
                  href="#reviews"
                  onClick={(e) => {
                    e.preventDefault();
                    const targetEl = document.querySelector('#reviews');
                    if (targetEl) {
                      targetEl.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <span className="star">&#9733;</span> {avgRating(reviews)}{' '}
                  <span>({reviews.length} reviews)</span>
                </a>
              </div>
            </div>
            <p className="price">{formatToUSDCurrency(price)}</p>
          </div>
          {state.items.find((item) => item.id === id) ? (
            <button onClick={() => setIsCartModalOpen(true)}>
              Added to cart
            </button>
          ) : (
            <button onClick={handleAddToCart}>Add to cart</button>
          )}
        </div>
      </div>

      <div className="about">
        <h2>About this item</h2>
        <About description={description} specifications={specifications} />
      </div>

      <div className="related">
        <h2>Related products</h2>
        <div
          style={
            {
              '--related-prod-items': product.related_products.length,
            } as CSSProperties
          }
          className="cards"
        >
          <RelatedProducts related={related_products} />
        </div>
      </div>

      <div className="reviews">
        <h2>Guest ratings &amp; reviews</h2>
        <Reviews reviews={reviews} />
      </div>
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
      <details open={true}>
        <summary>Details</summary>
      </details>
      <div className="content">
        <h3>Description</h3>
        <p>{description}</p>
      </div>

      <details>
        <summary>Specifications</summary>
      </details>
      <ul className="content">
        {Object.entries(specifications).map(([key, value]) => (
          <li key={key}>
            <b>{key}</b>: {value}
          </li>
        ))}
      </ul>
    </>
  );
};

const RelatedProducts = ({ related }: { related: RelatedProduct[] }) => {
  const { state, dispatch } = useCartContext();
  const { setIsCartModalOpen } = useCartModalContext();
  return (
    <>
      {Object.values(related).map(({ id, image, name, price }) => (
        <article key={id} className="related-prod-card">
          <figure title={name}>
            <img src={image} alt={name} />
          </figure>
          <div className="related-prod-info">
            <span>{formatToUSDCurrency(price)}</span>
            <h3>{name}</h3>
          </div>
          {state.items.find((item) => item.id === id) ? (
            <button onClick={() => setIsCartModalOpen(true)}>
              Added to cart
            </button>
          ) : (
            <button
              onClick={() => {
                dispatch({
                  type: 'ADD_TO_CART',
                  payload: { id, name, price },
                });
                setIsCartModalOpen(true);
              }}
            >
              Add to cart
            </button>
          )}
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
          <div className="review" key={id}>
            <div className="review-info">
              <div className="author-time">
                <h4>{author}</h4> -{' '}
                <time dateTime={timestamp}>
                  {daysAgo} {daysAgo === 1 ? 'day' : 'days'} ago
                </time>
              </div>
              <span className="star-rating">
                <span className="star">&#9733;</span> {rating}
              </span>
            </div>
            <p className="review-content">{text}</p>
          </div>
        );
      })}
    </div>
  );
};
