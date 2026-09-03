import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AssetRequest {
  assetName: string;
  type: string;
  serialNumber: string;
  status: string;
  condition: string;
  purchaseDate: string | null;
  purchaseValue: number | null;
  notes: string | null;
}

export interface AssetResponse {
  id: number;
  assetName: string;
  type: string;
  serialNumber: string;
  status: string;
  condition: string;
  purchaseDate: string | null;
  purchaseValue: number | null;
  notes: string | null;
  assignedToId: number | null;
  assignedToName: string | null;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class Assets {

  private readonly apiUrl = 'http://localhost:9091/api/assets';

  constructor(private http: HttpClient) {}

  // =========================================================
  // CREATE ASSET
  // =========================================================

  createAsset(
    asset: AssetRequest,
    token: string
  ): Observable<AssetResponse> {

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<AssetResponse>(
      this.apiUrl,
      asset,
      { headers }
    );
  }

   getAllAssets(
    token: string
  ): Observable<AssetResponse[]> {

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<AssetResponse[]>(
      this.apiUrl,
      { headers }
    );
  }
}