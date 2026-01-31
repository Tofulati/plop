export default function RatingStars({ rating }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  return (
    <span>
      {"★".repeat(fullStars)}
      {halfStar && "½"}
      {"☆".repeat(5 - fullStars - (halfStar ? 1 : 0))}
    </span>
  );
}
