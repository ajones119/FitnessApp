import React from 'react';
import { useExcercises } from '../../service/WeightExcercises';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { SelectGroup, SelectLabel } from '@radix-ui/react-select';

type Props = {
    value: string;
    onChange: (value: string) => void;
};

export const ExerciseSelect: React.FC<Props> = ({ value, onChange }) => {
    const {data: exerciseCache, isLoading} = useExcercises();

    if (isLoading || !exerciseCache) {
        return <div>Loading...</div>;
    }
    
    const {map, typeMap} = exerciseCache;

    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Exercise">{value && map[value]?.name}</SelectValue>
            </SelectTrigger>
            <SelectContent>
                {Object.values(typeMap)?.map((group) => {
                    return (
                        <SelectGroup>
                            <SelectLabel>{group[0].group?.name || "Ungrouped"}</SelectLabel>
                            {group.map((exercise) => {
                                return (
                                    <SelectItem key={exercise.id} value={exercise.id}>{exercise.name}</SelectItem>
                                );
                            })}
                        </SelectGroup>
                    );
                })}
            </SelectContent>
        </Select>
    );
};