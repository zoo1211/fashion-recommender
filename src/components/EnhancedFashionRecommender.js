"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Save } from "lucide-react";

const EnhancedFashionRecommender = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [savedOutfits, setSavedOutfits] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch("https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=Seoul");
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("날씨 데이터를 가져오는데 실패했습니다:", error);
      }
      setLoading(false);
    };

    fetchWeatherData();
  }, []);

  const clothingData = [
    {
      id: 1,
      name: "베이직 트렌치코트",
      brand: "Fashion Brand A",
      price: 129000,
      imageUrl: "/images/trenchcoat.jpg",
      shopUrl: "https://shop.example.com/item/1",
    },
  ];

  const toggleFavorite = (id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <Card className="mb-6">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold">현재 날씨</h3>
          {loading ? <p className="text-gray-400">날씨 정보를 불러오는 중...</p> : <p className="text-gray-600">서울 - {weatherData?.current?.condition?.text}, {weatherData?.current?.temp_c}°C</p>}
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>추천 코디</CardTitle>
        </CardHeader>
        <CardContent>
          {clothingData.map((item) => (
            <div key={item.id} className="border rounded-lg p-4">
              <h4 className="font-semibold">{item.name}</h4>
              <p className="text-sm text-gray-600">{item.brand}</p>
              <p className="font-medium">{item.price.toLocaleString()}원</p>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => toggleFavorite(item.id)}>
                  <Heart className={`w-5 h-5 ${favorites.includes(item.id) ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button variant="outline" className="w-full" onClick={() => window.open(item.shopUrl, "_blank")}>
                  구매하기
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedFashionRecommender;
