-- 1. Tạo database yelp (chạy ở database mặc định, ví dụ postgres)
CREATE DATABASE yelp;

-- 2. Chuyển kết nối sang yelp
\c yelp

-- 3. Tạo bảng restaurants
CREATE TABLE amenitys (
    id BIGSERIAL       PRIMARY KEY,
    name VARCHAR(50)   NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT    NOT NULL CHECK (price_range >= 1 AND price_range <= 5)
);


-- 5. Tạo bảng reviews
CREATE TABLE reviews (
    id BIGSERIAL       PRIMARY KEY,
    restaurant_id BIGINT  NOT NULL REFERENCES amenitys(id),
    name VARCHAR(50)   NOT NULL,
    review TEXT        NOT NULL,
    rating INT         NOT NULL CHECK (rating >= 1 AND rating <= 5)
);

-- 4. Thêm dữ liệu vào amenitys
INSERT INTO amenitys (id, name, location, price_range) 
VALUES 
    (123, 'McDonalds', 'New York', 3),
    (124, 'KFC', 'Chicago', 4),
    (125, 'Subway', 'San Francisco', 2),
    (126, 'The Burger Hub', 'Los Angeles', 3),
    (127, 'Sushi World', 'Tokyo', 4),
    (128, 'Pasta Fresca', 'Rome', 3),
    (129, 'Taco Fiesta', 'Mexico City', 2),
    (130, 'Curry Corner', 'Mumbai', 3),
    (131, 'City General Hospital', 'Boston', 2),
    (132, 'Green Valley Medical Center', 'Denver', 3),
    (133, 'St. Mary''s Hospital', 'London', 2),
    (134, 'Sunshine Health Clinic', 'Sydney', 2),
    (135, 'Riverbank Hospital', 'Toronto', 3),
    (136, 'Grand Plaza Hotel', 'Paris', 5),
    (137, 'Oceanview Inn', 'Miami', 4),
    (138, 'Mountain Retreat Resort', 'Aspen', 5),
    (139, 'City Lights Hotel', 'New York', 4),
    (140, 'Royal Palace Hotel', 'Dubai', 5),
    (141, 'Wonderland Amusement Park', 'Orlando', 4),
    (142, 'Galaxy Fun Center', 'Las Vegas', 3),
    (143, 'Adventure World', 'Gold Coast', 4),
    (144, 'Kids Play Zone', 'London', 2),
    (145, 'FunTime Arcade', 'Tokyo', 3);


-- 6. Thêm dữ liệu vào reviews
INSERT INTO reviews (amenitys_id, name, review, rating) 
VALUES 
    (123, 'Carl', 'amenity was awesome', 5),
    (123, 'Anna', 'Pretty good', 4),
    (124, 'John', 'Okay experience', 3),
    (125, 'Lara', 'Not bad at all', 4),
    (125, 'Ben', 'Fresh and clean', 5),
    (123, 'Carl', 'amenity was awesome', 5),
  (123, 'Anna', 'Pretty good', 4),
  (124, 'John', 'Okay experience', 3),
  (125, 'Lara', 'Not bad at all', 4),
  (125, 'Ben', 'Fresh and clean', 5),
  (126, 'Alice', 'Loved it, highly recommend.', 5),
  (126, 'Bob',   'Could be better.', 3),
  (127, 'Charlie','Fantastic atmosphere.', 4),
  (127, 'David', 'Not worth the price.', 2),
  (128, 'Eva',   'Clean and well maintained.', 5),
  (129, 'Frank', 'Overcrowded and noisy.', 2),
  (130, 'Grace', 'Had a great time with family.', 4),
  (131, 'Hannah','Service was excellent.', 5),
  (132, 'Ian',   'Underwhelming overall.', 3),
  (133, 'Jane',  'Best place in town.', 5),
  (134, 'Kevin', 'Friendly staff.', 4),
  (135, 'Laura', 'Quiet and relaxing.', 4),
  (136, 'Mike',  'Exceeded my expectations!', 5),
  (137, 'Nina',  'Mediocre at best.', 2),
  (138, 'Oscar', 'Will definitely come back.', 4),
  (139, 'Paula', 'Top notch facilities.', 5),
  (140, 'Quincy','Not my cup of tea.', 2),
  (141, 'Rachel','Great value for money.', 4),
  (142, 'Steve', 'Terrible service.', 1),
  (143, 'Tina',  'Delicious meals.', 5),
  (144, 'Uma',   'Poor hygiene.', 1),
  (145, 'Victor','Breathtaking view.', 5),
  (126, 'Wendy','Fast check-in.', 4),
  (127, 'Xavier','Fresh and clean.', 5),
  (128, 'Yvonne','Okay experience.', 3);

