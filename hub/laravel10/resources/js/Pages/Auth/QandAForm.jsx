import { Inertia } from '@inertiajs/inertia'; // 核心
import { usePage } from '@inertiajs/inertia-react'; // React Hook
import React, { useState } from 'react';

export default function QandAForm({ inquirType }) {
    const [types_id, setTypesId] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // 發送 POST 請求到 /inquiry/store
        Inertia.post('/inquiry/store', {
            types_id,
            question,
            answer,
        });

        // 清空表單
        setQuestion('');
        setAnswer('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>類型:</label>
                <select value={types_id} onChange={e => setTypesId(e.target.value)} required>
                    <option value="">選擇類型</option>
                    {inquirType.map(type => (
                        <option key={type.id} value={type.id}>{type.type_name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label>問題:</label>
                <input
                    type="text"
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>答案:</label>
                <textarea
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                    required
                />
            </div>

            <button type="submit">新增</button>
        </form>
    );
}
