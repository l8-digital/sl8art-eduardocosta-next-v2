import MusicSection from '@/app/(pages)/(home)/MusicSection/client';
import { api } from '@/app/api';
import {  SocialType } from '@/types/configuration';

export default async function ServerMusic() {
    const social = await api.configuration.getSocial() as SocialType[];


    return (
        <MusicSection social={social[0]} />
    )
}