import { Api } from "@/lib/api";
import { ConfigurationTypes } from "@/types/configuration";
import { apiCache } from "@/utils/cache";

export class Configuration extends Api {

    async getAll() {

        const includes = [
            'hotsite_configurations',
            'site_configuration_people',
            'centralfas_configurations'
        ].join(',');

        const endpoint = `/site_informations/${includes}`;

        const cached = apiCache.get(endpoint);
        if (cached) return cached;

        const data = await this.get(endpoint);
        apiCache.set(endpoint, data);
        return data;

    }

    async getPlataformsId() {

        const enpoint = "/configuration"

        const cached = apiCache.get(enpoint);
        if (cached) return cached;

        const data = await this.get(enpoint);
        if (data)
            apiCache.set(enpoint, data);
        return data;

    }

    async getTheme() {

        const includes = [
            'site_configuration_people',
        ].join(',');

        const endpoint = `/site_informations/${includes}`;

        const cached = apiCache.get(endpoint);
        if (cached) return cached;

        const data = await this.get(endpoint) as ConfigurationTypes;
        if (data)
            apiCache.set(endpoint, data?.site_configuration_people?.[0]);

        return data?.site_configuration_people?.[0];

    }

    async getMenus() {

        const includes = [
            'site_configuration_people',
        ].join(',');

        const endpoint = `/site_informations/${includes}`;

        const cached = apiCache.get(endpoint);
        if (cached) return cached;

        const data = await this.get(endpoint) as ConfigurationTypes;
        apiCache.set(endpoint, data?.menus[0]);
        return data?.menus[0];

    }

    async getSocial() {

        const endpoint = "/configuration_basic"

        const cached = apiCache.get(endpoint);
        if (cached) return cached;

        const data = await this.get(endpoint);
        apiCache.set(endpoint, data);
        return data;

    }
}
