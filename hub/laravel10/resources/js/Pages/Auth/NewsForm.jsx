import { Inertia } from '@inertiajs/inertia'; // 核心
import { usePage } from '@inertiajs/react'; // React Hook
import React, { useState } from 'react';

export default function QandAForm({ news_type }) {

    const [types_id, setTypesId] = useState('');
    const today = new Date().toISOString().split("T")[0];
    const [published_at, setPublishedAt] = useState(today);
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // 發送 POST 請求到 /inquiry/store
        Inertia.post('/news/store', {
            types_id,
            published_at,
            title,
            comment,
        });

        // 清空表單
        setTypesId('');
        setPublishedAt('');
        setTitle('');
        setComment('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>類型:</label>
                <select value={types_id} onChange={e => setTypesId(e.target.value)} required>
                    <option value="">選擇類型</option>
                    {news_type.map(type => (
                        <option key={type.id} value={type.id}>{type.type_name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>公開日:</label>
                <input
                    type="date"
                    value={published_at}
                    onChange={e => setPublishedAt(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>タイトル:</label>
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>内容:</label>
                <textarea
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    required
                />
            </div>

            <button type="submit">新增</button>
        </form>
    );
}
