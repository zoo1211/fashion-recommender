"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Sun, Cloud, Leaf, Snowflake, Heart, User, Save } from 'lucide-react';

const EnhancedFashionRecommender = () => {
  // 상태 관리
  const [selectedSeason, setSelectedSeason] = useState('spring');
  const [currentOutfit, setCurrentOutfit] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [userProfile, setUserProfile] = useState({
    height: 170,
    weight: 65,
    bodyType: 'regular',
    preferences: []
  });
  const [favorites, setFavorites] = useState([]);
  const [savedOutfits, setSavedOutfits] = useState([]);
  const [loading, setLoading] = useState(false);

  // 날씨 API 데이터 가져오기 (예시)
  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        // 실제 구현 시에는 실제 날씨 API endpoint로 교체
        const response = await fetch('https://api.weatherapi.com/v1/current.json');
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('날씨 데이터를 가져오는데 실패했습니다:', error);
      }
      setLoading(false);
    };

    fetchWeatherData();
  }, []);

  // 의류 데이터 (예시 - 실제로는 외부 API에서 가져올 데이터)
  const clothingData = {
    items: [
      {
        id: 1,
        name: '베이직 트렌치코트',
        brand: 'Fashion Brand A',
        price: 129000,
        imageUrl: '/api/placeholder/300/400',
        modelUrl: '/3d-models/trenchcoat.glb', // 3D 모델 파일
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['베이지', '네이비', '블랙'],
        shopUrl: 'https://shop.example.com/item/1'
      },
      // ... 더 많은 의류 아이템
    ]
  };

  // 사용자 체형 정보 업데이트
  const updateUserProfile = (field, value) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 좋아요 토글
  const toggleFavorite = (outfitId) => {
    setFavorites(prev => 
      prev.includes(outfitId)
        ? prev.filter(id => id !== outfitId)
        : [...prev, outfitId]
    );
  };

  // 코디 저장
  const saveOutfit = (outfit) => {
    setSavedOutfits(prev => [...prev, outfit]);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* 날씨 정보 표시 */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">현재 날씨</h3>
              {weatherData ? (
                <p className="text-gray-600">서울 - 맑음, 23°C</p>
              ) : (
                <p className="text-gray-400">날씨 정보를 불러오는 중...</p>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-600">추천 스타일: 가벼운 아우터</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 메인 컨텐츠 영역 */}
      <div className="grid md:grid-cols-12 gap-6">
        {/* 사용자 프로필 및 체형 정보 */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              프로필 정보
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">키 (cm)</label>
                <Slider
                  value={[userProfile.height]}
                  min={140}
                  max={200}
                  step={1}
                  onValueChange={([value]) => updateUserProfile('height', value)}
                  className="mt-2"
                />
                <span className="text-sm text-gray-600">{userProfile.height}cm</span>
              </div>

              <div>
                <label className="text-sm font-medium">체중 (kg)</label>
                <Slider
                  value={[userProfile.weight]}
                  min={40}
                  max={120}
                  step={1}
                  onValueChange={([value]) => updateUserProfile('weight', value)}
                  className="mt-2"
                />
                <span className="text-sm text-gray-600">{userProfile.weight}kg</span>
              </div>

              <div>
                <label className="text-sm font-medium">체형</label>
                <select
                  className="w-full mt-1 rounded-md border border-gray-300 p-2"
                  value={userProfile.bodyType}
                  onChange={(e) => updateUserProfile('bodyType', e.target.value)}
                >
                  <option value="slim">마른 체형</option>
                  <option value="regular">보통 체형</option>
                  <option value="muscular">근육질 체형</option>
                  <option value="plus">통통한 체형</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3D 가상 피팅 영역 */}
        <Card className="md:col-span-5">
          <CardHeader>
            <CardTitle>3D 가상 피팅</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 rounded-lg p-4 aspect-[3/4] flex items-center justify-center">
              {currentOutfit ? (
                <div className="text-center">
                  <img
                    src="/api/placeholder/400/500"
                    alt="3D Virtual Fitting"
                    className="mx-auto mb-4 rounded-lg"
                  />
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline" size="sm">회전</Button>
                    <Button variant="outline" size="sm">확대</Button>
                    <Button variant="outline" size="sm">축소</Button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">코디를 선택하여 가상 피팅을 시작하세요</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 추천 코디 및 상품 정보 */}
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>추천 코디</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clothingData.items.map((item) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{item.name}</h4>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFavorite(item.id)}
                      >
                        <Heart
                        className={`w-5 h-5 ${favorites.includes(item.id) ? 'fill-red-500 text-red-500' : ''}`}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => saveOutfit(item)}
                      >
                        <Save className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{item.brand}</p>
                  <p className="font-medium mb-2">{item.price.toLocaleString()}원</p>
                  <div className="flex gap-2 mb-3">
                    {item.sizes.map((size) => (
                      <Button
                        key={size}
                        variant="outline"
                        size="sm"
                        className="min-w-[40px]"
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                  <div className="flex gap-2 mb-4">
                    {item.colors.map((color) => (
                      <Button
                        key={color}
                        variant="outline"
                        size="sm"
                      >
                        {color}
                      </Button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1"
                      onClick={() => setCurrentOutfit(item)}
                    >
                      피팅해보기
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => window.open(item.shopUrl, '_blank')}
                    >
                      구매하기
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedFashionRecommender;
