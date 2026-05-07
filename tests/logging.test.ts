import { describe, it, expect, vi } from 'vitest';
import { SpaceManager } from '../src/core/SpaceManager';
import { ILogger } from '../src/core/Logger';

describe('Logging', () => {
  it('should call custom logger when creating a space', async () => {
    const mockLogger: ILogger = {
      debug: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };

    const sm = new SpaceManager(undefined, mockLogger);
    await sm.createSpace({
      name: 'Logged Space',
      type: 'community',
      mission: 'Mission text for logs',
      values: ['L'],
      visibility: 'PUBLIC',
      ownerId: 'u1'
    });

    expect(mockLogger.info).toHaveBeenCalled();
  });
});
