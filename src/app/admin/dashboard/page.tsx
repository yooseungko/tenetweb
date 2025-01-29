'use client';

import { useEffect, useState, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import type { Streamer } from '@/types/streamer';
import { Label } from "@/components/ui/label";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [streamers, setStreamers] = useState<Streamer[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    tradingStyle: '',
    description: '',
    followers: 0,
    averageViewers: 0,
    socialLinks: {
      twitter: '',
      discord: '',
      youtube: ''
    },
    imageUrl: ''
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin');
    }
  }, [status, router]);

  useEffect(() => {
    fetchStreamers();
  }, []);

  const fetchStreamers = async () => {
    try {
      const response = await fetch('/api/streamers');
      const data = await response.json();
      setStreamers(data);
    } catch (error) {
      console.error('Error fetching streamers:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = editingId ? `/api/streamers/${editingId}` : '/api/streamers';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
      await fetchStreamers();
      resetForm();
      }
    } catch (error) {
      console.error('Error saving streamer:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (streamer: Streamer) => {
    setEditingId(streamer._id);
    setFormData({
      name: streamer.name,
      title: streamer.title,
      tradingStyle: streamer.tradingStyle,
      description: streamer.description,
      followers: streamer.followers,
      averageViewers: streamer.averageViewers,
      socialLinks: streamer.socialLinks || {
        twitter: '',
        discord: '',
        youtube: ''
      },
      imageUrl: streamer.imageUrl || ''
    });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`/api/streamers/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
      await fetchStreamers();
      }
    } catch (error) {
      console.error('Error deleting streamer:', error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('image', file)
    
    if (editingId) {
      formData.append('streamerId', editingId)
    }

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('이미지 업로드에 실패했습니다')
      }

      const data = await response.json()
      setFormData(prev => ({
        ...prev,
        imageUrl: data.imageUrl
      }))
    } catch (error) {
      console.error('Error:', error)
      alert('이미지 업로드에 실패했습니다')
    }
  }

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      title: '',
      tradingStyle: '',
      description: '',
      followers: 0,
      averageViewers: 0,
      socialLinks: {
        twitter: '',
        discord: '',
        youtube: ''
      },
      imageUrl: ''
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith('socialLinks.')) {
      const socialKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialKey]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'followers' || name === 'averageViewers'
          ? parseInt(value) || 0
          : value
      }));
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="TENET Logo"
                width={140}
                height={56}
                className="w-[140px] h-auto"
                priority
              />
              <span className="ml-4 text-muted-foreground">관리자 대시보드</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">{session?.user?.email}</span>
              <Button
                variant="outline"
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                로그아웃
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-24">
        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>{editingId ? '스트리머 수정' : '새 스트리머 추가'}</CardTitle>
              <CardDescription>
                스트리머 정보를 입력하세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">이름</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">직함</label>
                    <Input
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">트레이딩 스타일</label>
                    <Input
                      name="tradingStyle"
                      value={formData.tradingStyle}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">팔로워 수</label>
                    <Input
                      type="number"
                      name="followers"
                      value={formData.followers}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">평균 시청자 수</label>
                    <Input
                      type="number"
                      name="averageViewers"
                      value={formData.averageViewers}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">프로필 이미지</label>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="cursor-pointer"
                  />
                  {formData.imageUrl && (
                    <div className="mt-2">
                      <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden bg-muted">
                        <Image
                          src={formData.imageUrl}
                          alt="프로필 미리보기"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">소개</label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Twitter</label>
                    <Input
                      name="socialLinks.twitter"
                      value={formData.socialLinks.twitter}
                      onChange={handleChange}
                      placeholder="https://twitter.com/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Discord</label>
                    <Input
                      name="socialLinks.discord"
                      value={formData.socialLinks.discord}
                      onChange={handleChange}
                      placeholder="https://discord.gg/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">YouTube</label>
                    <Input
                      name="socialLinks.youtube"
                      value={formData.socialLinks.youtube}
                      onChange={handleChange}
                      placeholder="https://youtube.com/..."
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? '저장 중...' : editingId ? '수정' : '추가'}
                  </Button>
                  {editingId && (
                    <Button type="button" variant="outline" onClick={resetForm}>
                      취소
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>스트리머 목록</CardTitle>
              <CardDescription>
                등록된 스트리머 목록입니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {streamers.map((streamer) => (
                  <Card key={streamer._id} className="w-full">
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {streamer.imageUrl && (
                            <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden bg-muted shrink-0">
                              <Image
                                src={streamer.imageUrl}
                                alt={streamer.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <h3 className="text-lg font-semibold">{streamer.name}</h3>
                            <p className="text-sm text-muted-foreground">{streamer.title}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(streamer)}
                          >
                            수정
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(streamer._id)}
                          >
                            삭제
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="text-center p-3 rounded-lg bg-muted/50">
                          <p className="text-sm font-medium text-muted-foreground">팔로워</p>
                          <p className="text-lg font-bold">
                            {streamer.followers.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-muted/50">
                          <p className="text-sm font-medium text-muted-foreground">평균 시청자</p>
                          <p className="text-lg font-bold">
                            {streamer.averageViewers.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground">{streamer.description}</p>
                      </div>
                      {streamer.socialLinks && Object.keys(streamer.socialLinks).length > 0 && (
                        <div className="flex gap-3 mt-4">
                          {streamer.socialLinks.youtube && (
                            <a
                              href={streamer.socialLinks.youtube}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-[#FF0000] transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
                              </svg>
                            </a>
                          )}
                          {streamer.socialLinks.twitter && (
                            <a
                              href={streamer.socialLinks.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-[#1DA1F2] transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                              </svg>
                            </a>
                          )}
                          {streamer.socialLinks.discord && (
                            <a
                              href={streamer.socialLinks.discord}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-[#5865F2] transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"/>
                              </svg>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
