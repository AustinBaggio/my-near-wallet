import { INDEXER_SERVICE_URL } from '../config';
import sendJson from '../tmp_fetch_send_json';
import { CUSTOM_REQUEST_HEADERS } from '../utils/constants';

export function listAccountsByPublicKey(publicKey) {
    return fetch(`${INDEXER_SERVICE_URL}/publicKey/${publicKey}/accounts`, {
        headers: {
            ...CUSTOM_REQUEST_HEADERS,
        }
    })
        .then((res) => res.json());
}

export function listLikelyNfts(accountId) {
    return sendJson('GET', `${INDEXER_SERVICE_URL}/account/${accountId}/likelyNFTs`);
}

export function listLikelyTokens(accountId) {
    return sendJson('GET', `${INDEXER_SERVICE_URL}/account/${accountId}/likelyTokens`);
}

export function listRecentTransactions(accountId) {
    return fetch(`${INDEXER_SERVICE_URL}/account/${accountId}/activity`, {
        headers: {
            ...CUSTOM_REQUEST_HEADERS,
        }
    })
        .then((res) => res.json());
}

export function listStakingDeposits(accountId) {
    return fetch(`${INDEXER_SERVICE_URL}/staking-deposits/${accountId}`, {
        headers: {
            ...CUSTOM_REQUEST_HEADERS,
        }
    })
        .then((r) => r.json());
}

export function listStakingPools() {
    return fetch(`${INDEXER_SERVICE_URL}/stakingPools`, {
        headers: {
            ...CUSTOM_REQUEST_HEADERS,
        }
    })
        .then((r) => r.json());
}
