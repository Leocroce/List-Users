import { TestBed } from '@angular/core/testing';

import { UsuariosServicoService } from './usuarios-servico.service';

describe('UsuariosServicoService', () => {
  let service: UsuariosServicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosServicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
