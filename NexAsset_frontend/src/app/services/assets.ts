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

  // =========================================================
  // GET ALL ASSETS
  // =========================================================

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

  // =========================================================
  // UPDATE ASSET
  // =========================================================

  updateAsset(
    id: number,
    asset: AssetRequest,
    token: string
  ): Observable<AssetResponse> {

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.put<AssetResponse>(
      `${this.apiUrl}/${id}`,
      asset,
      { headers }
    );
  }

  // =========================================================
  // DELETE ASSET
  // =========================================================

  deleteAsset(
    id: number,
    token: string
  ): Observable<void> {

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`,
      { headers }
    );
  }

  // =========================================================
  // ASSIGN ASSET
  // =========================================================

  assignAsset(
    assetId: number,
    employeeId: number,
    token: string
  ): Observable<AssetResponse> {

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.put<AssetResponse>(
      `${this.apiUrl}/${assetId}/assign/${employeeId}`,
      {},
      { headers }
    );
  }

  // =========================================================
  // UNASSIGN ASSET
  // =========================================================

  unassignAsset(
    assetId: number,
    token: string
  ): Observable<AssetResponse> {

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.put<AssetResponse>(
      `${this.apiUrl}/${assetId}/unassign`,
      {},
      { headers }
    );
  }
}